const Comment = require('../model/comment.model');

const commentController = {
  createComment: async (req, res) => {
    try {
      const { postId, text } = req.body;
      const image = req.file ? req.file.filename : null;

      const comment = await Comment.create({
      postId,
      text,
      image,
      createdBy: req.user._id
      });
      return res.status(201).json({ comment });
    } catch (error) {
      return res.status(500).json({ message:"Error while posting the comment"});
    }
  },

  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find().populate('createdBy', 'name email').populate('postId', 'title');

      return res.status(200).json({ comments });
    } catch (error) {
      return res.status(500).json({ message:"Error while getting all comments"});
    }
  },
};

module.exports = commentController;