const Post = require('../model/post.model');
const Comment = require('../model/comment.model');

const postController = {
  // Create post
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const images = req.files?.map(file => file.filename) || [];

      const post = await Post.create({
        title,
        content,
        images,
        createdBy: req.user._id
      });

      return res.status(201).json({ post });
    } catch (error) {
      return res.status(500).json({ 
        message: "Error creating post",
        error: error.message 
      });
    }
  },

  // Get all posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate('createdBy', 'name email')
        .populate('comments')
        .sort({ createdAt: -1 });

      return res.status(200).json({ posts });
    } catch (error) {
      return res.status(500).json({ 
        message: "Error fetching posts",
        error: error.message 
      });
    }
  },

  // Get single post
  getPostById: async (req, res) => {
    try {
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
    } catch (error) {
      return res.status(500).json({ 
        message: "Error fetching post"
      });
    }
  }
};

module.exports = postController;