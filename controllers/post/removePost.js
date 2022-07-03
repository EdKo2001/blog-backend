const { PostModel } = require("../../models");

const removePost = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Failed to delete article",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve articles",
    });
  }
};

module.exports = removePost;
