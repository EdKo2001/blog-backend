import { Types } from "mongoose";

const users = [
  {
    _id: new Types.ObjectId("4edd40c86762e0fb12000003"),
    fullName: "Admin User",
    email: "admin@admin.com",
    password: "password",
    passwordHash:
      "$2a$10$KR/Ti0D/8t2wOuGImFEoYuWn4Gfs7/uCZM.zcwGS3dYM2skBjOsiW",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCIsIl9pZCI6IjRlZGQ0MGM4Njc2MmUwZmIxMjAwMDAwMyJ9.HmC0gl4aWdkrUyKmQDIw5rHtC5BlvYDlJCS9MxQtIAY",
  },
  {
    _id: new Types.ObjectId("4edd40c86762e0fb12000004"),
    fullName: "User",
    email: "edko2001@gmail.com",
    password: "passwordHash",
    passwordHash: "$2a$10$4CRVg0EmDzNbtBiS.DhSseAuhPS7HyXSfBXZJ/4XMWgioORvNabZ",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCIsIl9pZCI6IjRlZGQ0MGM4Njc2MmUwZmIxMjAwMDAwNCJ9.3VibnehWTGmgOozDVyvqk6HdUHAni3rS0TkwNhek6Xw",
  },
];

export default users;
