Backend API - Authentication Server (Node.js + Express + JWT)
This backend provides authentication endpoints (Signup, Login, Google OAuth) with JWT-based authentication for a React frontend.

🚀 Features
✅ User Signup & Login (Email + Password)
✅ JWT Authentication & Token Verification
✅ Google OAuth Authentication
✅ Secure Password Hashing using bcryptjs
✅ REST API with Express.js
✅ MongoDB (via Mongoose) or any database

🛠️ Tech Stack
Node.js + Express.js

MongoDB (Mongoose ORM)

JWT (jsonwebtoken)

bcryptjs (Password Hashing)

CORS (for frontend connection)

📂 Project Structure
pgsql
Copy
Edit
backend/
│-- server.js              # Entry point (Express server)
│-- config/
│   └── db.js              # Database connection (MongoDB)
│
│-- middleware/
│   └── authMiddleware.js  # JWT authentication middleware
│
│-- models/
│   └── User.js            # User model (Mongoose schema)
│
│-- routes/
│   └── authRoutes.js      # Authentication routes (signup/login/google)
│
│-- controllers/
│   └── authController.js  # Authentication logic
│
│-- .env                   # Environment variables
⚙️ Installation & Setup
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/backend.git
cd backend
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Setup .env File
Create a .env file:

ini
Copy
Edit
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id



npm run dev    # Uses nodemon
REACT_APP_API_URL=http://localhost:5000/api

**npm run build
** npm start
***
cd backend
npm install
***
cd frontend
npm run build
