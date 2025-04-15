// const Post = require('../model/post.model');

// const postController = {
//   createPost: async (req, res) => {
//     try {
//       const { title, content } = req.body;
//       const images = req.files?.map(file => file.filename) || []; // Handle 0/1/many images
  
//       const post = await Post.create({
//         title,
//         content,
//         images,
//         author: req.user._id,    // Add this line
//         createdBy: req.user._id // Existing line
//       });
  
//       return res.status(201).json({ post });
//     } catch (error) {
//       return res.status(500).json({ 
//         message: "Error while posting",
//         error: error.message 
//       });
//     }
//   },

//   getAllPosts: async (req, res) => {
//     try {
//       const posts = await Post.find().populate('createdBy', 'name email');
//       return res.status(200).json({ posts }); // Will now include 'images' array
//     } catch (error) {
//       return res.status(500).json({ message: "Error while fetching all posts." });
//     }
//   }
// };

// module.exports = postController;

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
        message: "Error fetching post",
        error: error.message 
      });
    }
  }
};

module.exports = postController;