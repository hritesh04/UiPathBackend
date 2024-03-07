const Post = require("../models/posts");

exports.getAllPosts = async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(offset);

    res.status(200).json({
      data: posts,
      success: true,
    });
  } catch (err) {
    res.status(401).json({
      data: err.message,
      success: false,
    });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Invalid Post id");
    }
    res.status(200).json({
      data: post,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

exports.addNewPost = async (req, res) => {
  // photosUrls will have all the urls of the photos stored in object store

  const { title, description, link, domain, type } = req.body;
  const files = req.files;
  try {
    const imgUrl = uploadImages(files);
    const post = new Post({
      title,
      description,
      domain,
      link: link,
      type,
      img_link: imgUrl[0],
    });

    await post.save().catch((err) => {
      throw new Error(err.message);
    });

    res.status(200).json({
      data: post,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      data: err.message,
      success: false,
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.query;
  try {
    const isPost = await Post.findByIdAndDelete(id)
      .then((post) => {
        if (!post) {
          throw new Error("Invalid Post Id");
        }
        res.status(200).json({
          data: post,
          success: true,
        });
      })
      .catch((err) => {
        throw new Error("Invalid Post Id");
      });
  } catch (err) {
    res.status(401).json({
      data: err.message,
      success: false,
    });
  }
};
