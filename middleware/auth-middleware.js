const { verifyToken } = require("../services/jwt.service");
const User = require("../model/user.model");

const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);

      if (!decoded || !decoded.id) {
        return res.status(401).json({ message: "Invalid Token" });
      }

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "Access Denied. User not found." });
      }

      // Role check
      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid or Expired Token" });
    }
  };
};

module.exports = authMiddleware;