import axios from 'axios';
import { AuthResponse } from '../types/auth';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const authAPI = {
  signup: (name: string, email: string, password: string) => 
    API.post('/auth/signup', { name, email, password }),
  verifyOtp: (email: string, otp: string) => 
    API.post<AuthResponse>('/auth/verify-otp', { email, otp }),
  login: (email: string, password: string) =>
    API.post<AuthResponse>('/auth/login', { email, password }),
  googleLogin: (tokenId: string) =>
    API.post<AuthResponse>('/auth/google-login', { tokenId }),
};

export const notesAPI = {
  getNotes: (token: string) => API.get('/notes', { headers: { Authorization: `Bearer ${token}` } }),
  createNote: (token: string, content: string) => 
    API.post('/notes', { content }, { headers: { Authorization: `Bearer ${token}` } }),
  deleteNote: (token: string, id: string) => 
    API.delete(`/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
};
