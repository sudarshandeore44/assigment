import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import { sendOtpEmail } from '../utils/sendotp';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'Email already exists' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await sendOtpEmail(email, otp);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, otp });

  res.json({ message: 'OTP sent to email', userId: user._id });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

  user.otp = undefined;
  await user.save();
  const token = generateToken(user._id.toString());

  res.json({ token, user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = generateToken(user._id.toString());

  res.json({ token, user });
};

export const googleLogin = async (req: Request, res: Response) => {
  const { tokenId } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) return res.status(400).json({ message: 'Google login failed' });

  const { email, name, sub } = payload;
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, name, googleId: sub });

  const token = generateToken(user._id.toString());
  res.json({ token, user });
};
