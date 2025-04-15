const Comment = require('../model/comment.model');
const Post = require('../model/post.model');

const commentController = {

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
        message: "Error creating comment"
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
        message: "Error fetching comments"
      });
    }
  }
};

module.exports = commentController;