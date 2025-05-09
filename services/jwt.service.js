const jwt = require("jsonwebtoken");

const tokenTasks = {
  generateToken: (user) => {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN } 
    );
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  },
  
  attachTokenToResponse: (res, token) => {
    res.setHeader('Authorization', `${token}`);
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  }
};

module.exports = tokenTasks;

