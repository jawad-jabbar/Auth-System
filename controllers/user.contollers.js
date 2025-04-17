const User = require("../model/user.model");
const { hashPassword, comparePassword } = require("../utils/bcrypt.utils");
const {
  generateToken,
  attachTokenToResponse,
} = require("../services/jwt.service");
const transporter = require("../services/nodemailer.services");
const otpGenerator = require("../utils/otp.utils");

const userController = {
  userSignup: async (req, res) => {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(newUser);
    attachTokenToResponse(res, token);

    const { password: _, ...restData } = newUser.toObject();
    return res.status(201).json({
      message: "User registered successfully",
      payload: {
        user: restData,
      },
    });
  },

  userLogin: async (req, res) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const token = generateToken(user);
      attachTokenToResponse(res, token);

      const { password: _, ...userData } = user.toObject();
      return res.status(200).json({
        message: "Logged in successfully",
        user: userData,
      });
  },

  forgotPassword: async (req, res) => {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const otp = otpGenerator();
      const otpExpires = new Date(
        Date.now() + process.env.OTP_EXPIRES_MINUTES * 60 * 1000
      );

      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset OTP",
        html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in ${process.env.OTP_EXPIRES_MINUTES} minutes.</p>`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        message: `OTP sent to your email (valid for ${process.env.OTP_EXPIRES_MINUTES} minutes)`,
      });
  },

  resetPassword: async (req, res) => {
      const { otp, newPassword } = req.body;

      const user = await User.findOne({ otp });
      if (!user || new Date() > user.otpExpires) {
        return res.status(400).json({
          message: "Invalid or expired OTP",
        });
      }

      user.password = await hashPassword(newPassword);
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      return res.status(200).json({
        message: "Password reset successfully",
      });
    },
    getAllUsers: async (req, res) => {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
  
        const users = await User.find()
          .select("-password") // Exclude passwords
          .skip((page - 1) * limit)
          .limit(limit);
  
        const totalUsers = await User.countDocuments();
  
        return res.status(200).json({
          message: "Users fetched successfully",
          payload: {
            totalUsers,
            page,
            limit,
            users,
          },
        });
      } 
  }

module.exports = userController;
