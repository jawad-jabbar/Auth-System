const Post = require('../model/post.model');

const postController = {
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const image = req.file ? req.file.filename : null;

      const post = await Post.create({
      title,
      content,
      image,
      createdBy: req.user._id
      });
      return res.status(201).json({ post });
    } catch (error) {
      return res.status(500).json({ message:"Error while posting", error: error.message });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate('createdBy', 'name email');

      return res.status(200).json({ posts });
    } catch (error) {
      return res.status(500).json({ message:"Error fetching all posts.", error: error.message });
    }
  },
};

module.exports = postController;