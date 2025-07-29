 Features
✅ Email & Password Signup/Login
✅ Google OAuth Login (using @react-oauth/google)
✅ Protected Routes (Dashboard)
✅ Context-based Authentication (AuthContext)
✅ Material UI for UI Components
✅ React Router v6 Navigation
✅ JWT Token Handling (using jwt-decode)

🛠️ Tech Stack

React 19 + TypeScript

Material-UI (MUI) v5

React Router v6

Axios (API calls)

JWT Decode

Google OAuth (via @react-oauth/google)



src/
│-- components/
│   ├── Header.tsx          # Navigation bar
│   └── NoteForm.tsx        # Example form component
│
│-- contexts/
│   └── AuthContext.tsx     # Authentication context provider
│
│-- pages/
│   ├── Login.tsx           # Login page
│   ├── Signup.tsx          # Signup page
│   └── Dashboard.tsx       # Protected dashboard
│
│-- App.tsx                 # Main app with routing
│-- index.tsx               # React entry point
│-- styles.css              # Global styles

npm install

REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_API_URL=http://localhost:5000/api

npm start
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

Authentication Flow
Email/Password: Handled through AuthContext and API calls.

Google OAuth: Implemented via @react-oauth/google.

JWT tokens are decoded using jwt-decode and stored in localStorage.