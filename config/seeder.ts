import dotenv from "dotenv";
import connectDB from "./mongoDB.js";

import User from "../models/User.js";

import users from "../data/users.js";

dotenv.config();

connectDB();

const importUsers = async () => {
  try {
    // await User.deleteMany();

    await User.insertMany(users);

    console.log("Users Imported");
    process.exit();
  } catch (error) {
    //@ts-ignore
    console.log(error);
    process.exit(1);
  }
};

// const deleteProducts = async () => {
//   try {
//     await Product.deleteMany();

//     console.log("Data destroyed");
//     process.exit();
//   } catch (err) {
//     //@ts-ignore
//     console.log(error);
//     process.exit(1);
//   }
// };

// importProducts();
// deleteProducts();

switch (process.argv[2]) {
  case "-d": {
    // importUsers();
    break;
  }
  default: {
    importUsers();
  }
}
