const Comment = require('../model/comment.model');
const Post = require('../model/post.model');
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

const commentController = {

  createComment: async (req, res) => {
    const { postId, text } = req.body;

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      let image;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'comments',
        });
        image = result.secure_url;
        fs.unlinkSync(req.file.path); // Clean up
      }

      const comment = await Comment.create({
        text,
        postId,
        image,
        createdBy: req.user._id,
      });

      post.comments.push(comment._id);
      await post.save();

      return res.status(201).json({ comment });
  },

  // Get comments for a post
  getPostComments: async (req, res) => {
      const comments = await Comment.find({ postId: req.params.postId })
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });

      return res.status(200).json({ comments });
    }
};

module.exports = commentController;