const Comment = require('../model/comment.model');
const Post = require('../model/post.model');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

const commentController = {

  // createComment: async (req, res) => {
  //     const { postId, text } = req.body;
  //     const image = req.file?.filename;

  //     // Check if post exists
  //     const post = await Post.findById(postId);
  //     if (!post) {
  //       return res.status(404).json({ message: "Post not found" });
  //     }

  //     const comment = await Comment.create({
  //       text,
  //       postId,
  //       image,
  //       createdBy: req.user._id
  //     });

  //     // Add comment to post's comments array
  //     post.comments.push(comment._id);
  //     await post.save();

  //     return res.status(201).json({ comment });
  // },
  createComment: async (req, res) => {
    const { postId, text } = req.body;
    let imageUrl;
  
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
  
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, 'comments');
    }
  
    const comment = await Comment.create({
      text,
      postId,
      image: imageUrl,
      createdBy: req.user._id
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