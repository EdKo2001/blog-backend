import m2s from "mongoose-to-swagger";

import { userModel, postModel } from "../models";

export default {
  User: m2s(userModel),
  Post: m2s(postModel),
};
