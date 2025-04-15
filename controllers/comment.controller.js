// const Comment = require('../model/comment.model');
// const Post = require('../model/post.model');

// const commentController = {
//   createComment: async (req, res) => {
//     try {
//       const { postId, text } = req.body;
      
//       // Validate required fields
//       if (!postId || !text) {
//         return res.status(400).json({ 
//           message: "postId and text are required fields" 
//         });
//       }

//       // Verify post exists
//       const postExists = await Post.exists({ _id: postId });
//       if (!postExists) {
//         return res.status(404).json({ message: "Post not found" });
//       }

//       const newComment = await Comment.create({
//         text,
//         postId,
//         image: req.file ? req.file.filename : null,
//         author: req.user._id,     // Required by model
//         createdBy: req.user._id   // Required by model
//       });

//       // Populate author details in response
//       const populatedComment = await Comment.findById(newComment._id)
//         .populate('author', 'name email')
//         .populate('createdBy', 'name email');

//       return res.status(201).json({ 
//         message: "Comment created successfully",
//         comment: populatedComment 
//       });

//     } catch (error) {
//       console.error("Comment creation error:", error);
//       return res.status(500).json({
//         message: "Error while posting the comment",
//         error: error.message // Detailed error in development
//       });
//     }
//   },

//   getAllComments: async (req, res) => {
//     try {
//       const comments = await Comment.find()
//         .populate('author', 'name email')
//         .populate('createdBy', 'name email')
//         .populate('postId', 'title');

//       return res.status(200).json({ comments });
//     } catch (error) {
//       return res.status(500).json({ 
//         message: "Error while getting all comments",
//         error: error.message
//       });
//     }
//   }
// };

// module.exports = commentController;

const Comment = require('../model/comment.model');
const Post = require('../model/post.model');

const commentController = {
  // Create comment
  createComment: async (req, res) => {
    try {
      const { postId, text } = req.body;
      const image = req.file?.filename;

      // Check if post exists
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const comment = await Comment.create({
        text,
        postId,
        image,
        createdBy: req.user._id
      });

      // Add comment to post's comments array
      post.comments.push(comment._id);
      await post.save();

      return res.status(201).json({ comment });
    } catch (error) {
      return res.status(500).json({ 
        message: "Error creating comment",
        error: error.message 
      });
    }
  },

  // Get comments for a post
  getPostComments: async (req, res) => {
    try {
      const comments = await Comment.find({ postId: req.params.postId })
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });

      return res.status(200).json({ comments });
    } catch (error) {
      return res.status(500).json({ 
        message: "Error fetching comments",
        error: error.message 
      });
    }
  }
};

module.exports = commentController;