"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.login = exports.verifyOtp = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../utils/generateToken");
const sendotp_1 = require("../utils/sendotp");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User_1.default.findOne({ email });
    if (existingUser)
        return res.status(400).json({ message: 'Email already exists' });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await (0, sendotp_1.sendOtpEmail)(email, otp);
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await User_1.default.create({ name, email, password: hashedPassword, otp });
    res.json({ message: 'OTP sent to email', userId: user._id });
};
exports.signup = signup;
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user || user.otp !== otp)
        return res.status(400).json({ message: 'Invalid OTP' });
    user.otp = undefined;
    await user.save();
    const token = (0, generateToken_1.generateToken)(user._id.toString());
    res.json({ token, user });
};
exports.verifyOtp = verifyOtp;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user || !user.password)
        return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({ message: 'Invalid credentials' });
    const token = (0, generateToken_1.generateToken)(user._id.toString());
    res.json({ token, user });
};
exports.login = login;
const googleLogin = async (req, res) => {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload)
        return res.status(400).json({ message: 'Google login failed' });
    const { email, name, sub } = payload;
    let user = await User_1.default.findOne({ email });
    if (!user)
        user = await User_1.default.create({ email, name, googleId: sub });
    const token = (0, generateToken_1.generateToken)(user._id.toString());
    res.json({ token, user });
};
exports.googleLogin = googleLogin;
