import { Types } from "mongoose";

const users = [
  {
    _id: new Types.ObjectId("4edd40c86762e0fb12000003"),
    fullName: "Admin User",
    email: "admin@admin.com",
    password: "password",
    passwordHash: "passwordHash",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIn0.aPDai2YbXazCylOpSStHCbL_pLWLdPSFsGNM5U2EYiM",
  },
  //   {
  //     id: 2,
  //     fullName: "Obi Wan Kenobi",
  //     email: "lasthope@email.com",
  //     password: "password",
  //   },
  //   {
  //     id: 3,
  //     fullName: "Rey Skywalker",
  //     email: "sucks@sucks.com",
  //     password: "password",
  //   },
  //   {
  //     id: 4,
  //     fullName: "John Don",
  //     email: "John@John.com",
  //     password: "password",
  //   },
];

export default users;
