import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const hashValue = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

// Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const genericMessage = "If this email exists, an OTP has been sent";
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(200).json({ success: true, message: genericMessage });
    }

    const now = Date.now();
    const lastRequest = user.resetOTPRequestedAt?.getTime() || 0;

    // Prevent repeated OTP requests for the same account within 60 seconds.
    if (now - lastRequest < 60 * 1000) {
      return res.status(200).json({ success: true, message: genericMessage });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = hashValue(otp);

    user.resetOTP = otpHash;
    user.resetOTPExpires = new Date(now + 10 * 60 * 1000);
    user.resetOTPAttempts = 0;
    user.resetOTPRequestedAt = new Date(now);
    user.resetTokenHash = null;
    user.resetTokenExpires = null;

    await user.save();

    await transporter.sendMail({
      from: `"NexAI" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "NexAI Password Reset OTP",
      text: `Your NexAI password reset OTP is ${otp}. It expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>NexAI Password Reset</h2>
          <p>Your password reset OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP expires in 10 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: genericMessage });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Verify OTP and issue a short-lived, one-time reset token.
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email?.trim() || !/^\d{6}$/.test(String(otp))) {
      return res.status(400).json({
        success: false,
        message: "Email and a valid 6-digit OTP are required",
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user || !user.resetOTP || !user.resetOTPExpires) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (user.resetOTPExpires < new Date()) {
      user.resetOTP = null;
      user.resetOTPExpires = null;
      user.resetOTPAttempts = 0;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (user.resetOTPAttempts >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many invalid OTP attempts. Please request a new OTP.",
      });
    }

    const isValidOTP = hashValue(String(otp)) === user.resetOTP;

    if (!isValidOTP) {
      user.resetOTPAttempts += 1;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetTokenHash = hashValue(resetToken);
    user.resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.resetOTP = null;
    user.resetOTPExpires = null;
    user.resetOTPAttempts = 0;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Reset password using the one-time reset token.
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Reset token and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const resetTokenHash = hashValue(resetToken);
    const user = await User.findOne({
      resetTokenHash,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetTokenHash = null;
    user.resetTokenExpires = null;
    user.resetOTP = null;
    user.resetOTPExpires = null;
    user.resetOTPAttempts = 0;
    user.resetOTPRequestedAt = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get user details for authenticated user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("_id name email role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get Me Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
