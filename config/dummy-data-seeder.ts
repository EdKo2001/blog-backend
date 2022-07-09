import dotenv from "dotenv";
import connectDB from "./mongoDB.js";

import User from "../models/User.js";

import users from "../data/users.js";

dotenv.config();

connectDB();

// Users Seeder
const importUsers = async () => {
  let newUsers = [...users];
  try {
    await User.deleteMany({
      $match: {
        _id: {
          $in: [users.map((user) => user._id)],
        },
      },
    });
    await User.find({
      $or: [
        {
          _id: users.map((user) => user._id),
        },
        {
          email: users.map((user) => user.email),
        },
      ],
    }).then((dbUsers) => {
      dbUsers.forEach(
        (dbUser: any) =>
          (newUsers = users.filter(
            (user) => dbUser._id !== user._id && dbUser.email !== user.email
          ))
      );
    });
    await User.insertMany(newUsers).then((result) =>
      result.length > 0
        ? console.log("Users Imported")
        : console.log("Users Up-To-Date")
    );

    process.exit();
  } catch (error) {
    //@ts-ignore
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
    }).then((result) =>
      result.deletedCount === 0
        ? console.log("Users Up-To-Date")
        : console.log("Users Deleted")
    );

    process.exit();
  } catch (error) {
    //@ts-ignore
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
