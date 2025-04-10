const { verifyToken } = require("../services/jwt.service");
const User = require("../model/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findById(decoded.id).select("-password"); // Exclude password from response
    if (!user) {
      return res.status(401).json({ message: "Access Denied. User not found." });
    }

    req.user = user; // Attach user data to request
    next(); // Proceed to next middleware

  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = authMiddleware;