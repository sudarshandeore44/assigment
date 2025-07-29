import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await authAPI.signup(name, email, password);
      setOtpSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAPI.verifyOtp(email, otp);
      navigate('/login');
    } catch {
      setError('Invalid OTP');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4">{otpSent ? 'Verify OTP' : 'Sign Up'}</Typography>
        {error && <Typography color="error">{error}</Typography>}

        {!otpSent ? (
          <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
            <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" fullWidth type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleVerifyOtp} sx={{ mt: 2 }}>
            <TextField label="OTP" fullWidth margin="normal" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Verify OTP</Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Signup;
