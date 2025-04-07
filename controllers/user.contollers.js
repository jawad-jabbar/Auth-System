const User = require('../model/user.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt.utils');
const { generateToken } = require('../services/jwt.service');
const transporter = require('../services/nodemailer.services');
const otpGenerator = require('../utils/otp.utils');

const userController = {
    userSignup: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ success: false, message: 'User already exists' });
            }

            const hashedPassword = await hashPassword(password);
            const newUser = await User.create({ name, email, password: hashedPassword, role});

            const token = generateToken(newUser);

            const { password: _, ...restData } = newUser.toObject();
            return res.status(201).json({ success: true, message: 'User registered successfully', user: restData, token });

        } catch (error) {
            return res.status(500).json({ success: false, error: 'Server error' });
        }
    },

    userLogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            const token = generateToken(user);
            const { password: _, ...userData } = user.toObject();
            return res.status(200).json({ success: true, message: 'Logged in successfully', user: userData, token });

        } catch (error) {
            return res.status(500).json({ success: false, error: 'Server error' });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }


            const otp = otpGenerator();
            const otpExpires = new Date(Date.now() + 60 * 1000);

            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();


            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Password Reset OTP",
                html: `<p>Your OTP for password reset is <b>${otp}</b>.</p>`,
            };

            await transporter.sendMail(mailOptions);


            return res.status(200).json({ success: true, message: "OTP sent to your email" });

        } catch (error) {
            return res.status(500).json({ success: false, error: "Server error" });
        }

    },

    resetPassword: async (req, res) => {
        try {
            const { otp, newPassword } = req.body;

            const user = await User.findOne({ otp });
            if (!user || new Date() > user.otpExpires) {
                return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
            }

            user.password = await hashPassword(newPassword);
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();

            return res.status(200).json({ success: true, message: "Password reset successfully" });

        } catch (error) {
            return res.status(500).json({ success: false, error: "Server error" });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            let { page, limit } = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;

            const users = await User.find()
                .select('-password') // Exclude passwords
                .skip((page - 1) * limit)
                .limit(limit);

            const totalUsers = await User.countDocuments();

            return res.status(200).json({
                message: "",
                payload: {
                totalUsers,
                page,
                limit,
                users
                }
            });

        } catch (error) {
            return res.status(500).json({ error: 'Server error', message: "" });
        }
    }
};

module.exports = userController;
