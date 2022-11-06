declare namespace Express {
  import { Schema } from "mongoose";

  import ROLES from "../constants/ROLES";

  interface Request {
    user: {
      id?: Schema.Types.ObjectId;
      role?: ROLES;
    };
    error: {
      name?: string;
      message: string | Error;
      stack?: string;
    };
  }
}
