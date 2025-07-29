import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Header from './pages/Header';

function App() {
  return (
    <AuthProvider>
      <Router>
     <Header/>
        <Routes>
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirect root */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
