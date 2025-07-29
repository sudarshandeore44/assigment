import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!).then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
