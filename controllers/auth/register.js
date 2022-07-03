const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserModel } = require("../../models");

const register = async (req, res) => {
  try {
    const isExistsUser = await UserModel.findOne({ email: req.body.email });
    if (isExistsUser) {
      res.status(500).json({
        message: "The email has already been taken.",
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save().catch((error) => {
      res.json(error);
    });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to register",
    });
  }
};

module.exports = register;
