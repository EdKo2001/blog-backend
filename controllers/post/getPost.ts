import { Request, Response } from "express";

import { postModel } from "../../models";

const getPost = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    const fields: string[] | undefined = (
      req.query.fields as string | undefined
    )?.split(",");

    const selectedFieldsObject = fields?.reduce(
      (obj: any, item) => ((obj[item] = 1), obj),
      {}
    );

    postModel
      .findOneAndUpdate(
        {
          slug,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          fields: selectedFieldsObject,
          returnDocument: "after",
        }
      )
      .select("-comments -excerpt")
      .populate("user", "fullName _id avatarUrl")
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json(doc);
      })
      .catch((err) => {
        req.error = { message: err };
        console.log(err);
        return res.status(500).json({
          message: "Unable to return article",
        });
      });
  } catch (err) {
    req.error = { message: err };
    console.log(err);
    res.status(503).json({
      message: "Failed to retrieve articles",
    });
  }
};

export default getPost;
