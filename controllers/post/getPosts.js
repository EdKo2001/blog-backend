const { PostModel } = require("../../models");

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve articles",
    });
  }
};

module.exports = getPosts;
