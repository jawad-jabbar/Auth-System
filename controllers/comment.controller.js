const Comment = require('../model/comment.model');

const commentController = {
  createComment: async (req, res) => {
    try {
      const { text, postId } = req.body;

      const comment = await Comment.create({ text, postId, createdBy: req.user._id });

      return res.status(201).json({ comment });
    } catch (error) {
      return res.status(500).json({ message:"Error while posting the comment", error: error.message });
    }
  },

  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find().populate('createdBy', 'name email').populate('postId', 'title');

      return res.status(200).json({ comments });
    } catch (error) {
      return res.status(500).json({ message:"Error while getting all comments", error: error.message });
    }
  },
};

module.exports = commentController;