const { verifyToken } = require("../services/jwt.service");
const User = require("../model/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("x-authorization") || req.cookies.token;

    
    // if (!token || !token.startsWith("Bearer ")) {
    //   return res.status(401).json({ message: "Access Denied. No token provided." });
    // }
    // console.log(token)

    // token = token.split(" ")[1]; 

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findById(decoded.id).select("-password"); 
    if (!user) {
      return res.status(401).json({ message: "Access Denied. User not found." });
    }

    req.user = user; 
    next();

  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = authMiddleware;