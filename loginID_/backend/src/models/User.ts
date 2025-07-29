import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: String;
    name: string;
  email: string;
  password?: string;
  otp?: string;
  googleId?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  otp: { type: String },
  googleId: { type: String },
});

export default mongoose.model<IUser>('User', userSchema);
