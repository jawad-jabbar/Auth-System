const Post = require("../model/post.model");
const { uploadBufferToCloudinary } = require("../utils/uploadToCloudinary");

const postController = {
  createPost: async (req, res) => {
    const { title, content } = req.body;
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = await Promise.all(
        req.files.map((file) => uploadBufferToCloudinary(file.buffer, "posts"))
      );
    }

    const post = await Post.create({
      title,
      content,
      images: imageUrls,
      createdBy: req.user._id,
    });

    return res.status(201).json({ post });
  },

  // Get all posts
  getAllPosts: async (req, res) => {
    const posts = await Post.find()
      .populate("createdBy", "name email")
      .populate("comments")
      .sort({ createdAt: -1 });

    return res.status(200).json({ posts });
  },

  // Get single post
  getPostById: async (req, res) => {
    const post = await Post.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate({
        path: "comments",
        populate: { path: "createdBy", select: "name email" },
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ post });
  },
};

module.exports = postController;
