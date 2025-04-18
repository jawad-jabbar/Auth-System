const Comment = require("../model/comment.model");
const Post = require("../model/post.model");
const { uploadFileToCloudinary } = require("../utils/uploadToCloudinary");
const path = require('path');

const commentController = {
  createComment: async (req, res) => {
    
    const { postId, text } = req.body;
    let imageUrl;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (req.file) {
      const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
      imageUrl = await uploadFileToCloudinary(filePath, "comments");
    }

    const comment = await Comment.create({
      text,
      postId,
      image: imageUrl,
      createdBy: req.user._id,
    });

    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({ comment });
  },

  getPostComments: async (req, res) => {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ comments });
  },
};

module.exports = commentController;
