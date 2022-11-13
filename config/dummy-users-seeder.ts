import dotenv from "dotenv";
import connectDB from "./mongoDB.js";

import User from "../models/User.js";

import users from "../data/users.js";

dotenv.config();

connectDB();

// Users Seeder
const importUsers = async () => {
  let newUsers = [...users];
  console.log(newUsers);
  console.log(users);

  try {
    // await User.deleteMany({
    //   $match: {
    //     _id: {
    //       $in: [users.map((user) => user._id)],
    //     },
    //   },
    // });
    // await User.find({
    //   $or: [
    //     {
    //       _id: users.map((user) => user._id),
    //     },
    //     {
    //       email: users.map((user) => user.email),
    //     },
    //   ],
    // }).then((dbUsers) => {
    //   dbUsers.forEach(
    //     (dbUser: any) =>
    //       (newUsers = users.filter(
    //         (user) => dbUser._id !== user._id && dbUser.email !== user.email
    //       ))
    //   );
    // });

    // for (let i = 0; i < posts.length; i++) {
    //   const title = posts[i].title;
    //   const text = posts[i].text;

    //   // check if that unique field already exists in the collection
    //   await Post.exists({ $or: [{ title }, { text }] }).then((exists) => {
    //     if (exists) {
    //       posts.splice(i, 1);
    //     }
    //   });
    // }

    // await User.insertMany(newUsers).then((res) =>
    //   res.length > 0
    //     ? console.log("Users Imported")
    //     : console.log("Users Up-To-Date")
    // );

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// Users Seeder
const deleteUsers = async () => {
  try {
    await User.deleteMany({
      $match: {
        _id: {
          $in: [users.map((user) => user._id)],
        },
      },
    }).then((res) =>
      res.deletedCount === 0
        ? console.log("There is no dummy user")
        : console.log("Users Deleted")
    );

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

switch (process.argv[2]) {
  case "-d": {
    // Users Seeder
    deleteUsers();
    break;
  }
  default: {
    // Users Seeder
    importUsers();
  }
}
