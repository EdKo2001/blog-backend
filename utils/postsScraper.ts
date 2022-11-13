import puppeteer from "puppeteer";
import fs from "fs";

import Post from "../models/Post";

// Dependencies, make sure you’re up to date first:
// sudo apt update && sudo apt -y upgrade && sudo apt -y autoremove
// Download and install Chrome:
// wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
// sudo apt -y install ./google-chrome-stable_current_amd64.deb
// To access Heroku app bash by CLI:
// heroku ps:exec --app=mern-blog-backend-part
// https://github.com/jontewks/puppeteer-heroku-buildpack

const postsScraper = async (limit = 1) => {
  const ADMIN_ID = process.env.ADMIN_ID as string;
  const BACKEND_URL = process.env.BACKEND_URL as string;

  const browser = await puppeteer.launch(
    process.env.ENV === "development"
      ? process.platform === "win32"
        ? // dev + win
          {}
        : // dev + other linux based systems
          {
            executablePath: "/usr/bin/google-chrome",
          }
      : // prod
        { args: ["--no-sandbox"] }
  );

  const page = await browser.newPage();

  await page.goto("https://www.freecodecamp.org/news/");

  const links = await page.evaluate((limit) => {
    const linksArray = [];
    const queryLinks = Array.from(
      document.querySelectorAll(".post-feed > .post-card .post-card-title > a")
    ).slice(0, limit);

    for (const queryLink of queryLinks) {
      linksArray.push(queryLink.getAttribute("href"));
    }

    return linksArray;
  }, limit);

  const posts: any[] = [];

  for (const link of links) {
    let imageSelector = "";

    await page.goto(`https://www.freecodecamp.org${link}`);

    const post = await page.evaluate(
      (ADMIN_ID, BACKEND_URL, imageSelector) => {
        const queryPost = document.querySelector("article.post-full.post");

        const title = queryPost?.querySelector("h1")?.innerHTML.trim();
        const text = queryPost
          ?.querySelector(".post-full-content .post-content")
          ?.innerHTML.trim();

        imageSelector = queryPost
          ?.querySelector(".post-full-image img")
          ?.getAttribute("src") as string;

        return {
          post: {
            title,
            slug: title?.replace(/ /g, "-").replace(/[^\w-]+/g, ""),
            text: text,
            excerpt: text?.slice(0, 240) + " ...",
            imageUrl: imageSelector?.replace(
              "https://www.freecodecamp.org/news/content/images/size/w2000/2022/11",
              "/uploads"
            ),
            user: ADMIN_ID,
            tags: queryPost
              ?.querySelector(".post-full-meta > a")
              ?.innerHTML.trim()
              .replace("#", ""),
          },
          imageSelector,
        };
      },
      ADMIN_ID,
      BACKEND_URL,
      imageSelector
    );

    posts.push(post.post);
    imageSelector = post.imageSelector;

    const image = await page.goto(imageSelector);

    fs.writeFile(
      "./uploads/" +
        imageSelector?.replace(
          "https://www.freecodecamp.org/news/content/images/size/w2000/2022/11",
          ""
        ),
      await image!.buffer(),
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );
  }

  await browser.close();

  const copiedPosts = [...posts];

  for (let i = 0; i < copiedPosts.length; i++) {
    const title = copiedPosts[i].title;
    const text = copiedPosts[i].text;

    // check if that unique field already exists in the collection
    await Post.exists({ $or: [{ title }, { text }] }).then((exists) => {
      if (exists) {
        const postIndex = posts.findIndex(
          (post) => post.title === title && post.text === text
        );

        posts.splice(postIndex, 1);
      }
    });
  }

  let message = "";

  await Post.insertMany(posts).then((res) => {
    message =
      res.length === 0
        ? "Posts up-to-date"
        : "Imported " + res.length + " Posts";
  });

  return {
    posts,
    message,
  };
};

export default postsScraper;
