import dotenv from "dotenv";

import connectDB from "./mongoDB.js";

import User from "../models/User.js";

import users from "../data/users.js";

dotenv.config();

connectDB();

// Users Seeder
const importUsers = async () => {
  let copiedUsers = [...users];

  try {
    for (let i = 0; i < copiedUsers.length; i++) {
      const email = copiedUsers[i].email;

      // check if that unique field already exists in the collection
      await User.exists({ email }).then((exists) => {
        if (exists) {
          const userIndex = users.findIndex((user) => user.email === email);

          users.splice(userIndex, 1);
        }
      });
    }

    await User.insertMany(users).then((res) =>
      res.length > 0
        ? console.log("Users Imported")
        : console.log("Users Up-To-Date")
    );

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
