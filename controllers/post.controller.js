const Post = require('../model/post.model');
const Comment = require('../model/comment.model');

const postController = {
  // Create post
  createPost: async (req, res) => {
      const { title, content } = req.body;
      const images = req.files?.map(file => file.filename) || [];

      const post = await Post.create({
        title,
        content,
        images,
        createdBy: req.user._id
      });

      return res.status(201).json({ post });
  },

  // Get all posts
  getAllPosts: async (req, res) => {
      const posts = await Post.find()
        .populate('createdBy', 'name email')
        .populate('comments')
        .sort({ createdAt: -1 });

      return res.status(200).json({ posts });
  },

  // Get single post
  getPostById: async (req, res) => {
      const post = await Post.findById(req.params.id)
        .populate('createdBy', 'name email')
        .populate({
          path: 'comments',
          populate: { path: 'createdBy', select: 'name email' }
        });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json({ post });
    } 
};

module.exports = postController;