import m2s from "mongoose-to-swagger";

import User from "./models/User";

export default {
  User: m2s(User),
};
