const jwt = require("jsonwebtoken");

const tokenTasks = {
  generateToken: (user) => {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  },
};

module.exports = tokenTasks;

