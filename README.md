# Student Management System – Backend

The backend API for the Student Management System built with Node.js, Express, and MongoDB. This RESTful API allows CRUD operations for managing student records.

## 📁 Project Structure

    backend-sms/
    ├── controllers/
    │   └── studentController.js      # Handles business logic for student routes
    ├── models/
    │   └── studentModel.js           # Mongoose schema for students
    ├── routes/
    │   └── studentRoutes.js          # API endpoints for students
    ├── config/
    │   └── db.js                     # MongoDB connection logic
    ├── index.js                      # Entry point for Express app
    ├── package.json
    ├── .env                          # Environment variables (e.g., DB URI, PORT)
    └── .gitignore

## 🚀 Features

    ✔️ RESTful API for student records
    ✔️ Create, Read, Update, Delete (CRUD) operations
    ✔️ MongoDB database integration via Mongoose
    ✔️ CORS enabled for frontend integration
    ✔️ Environment variable support via dotenv
    ✔️ Modular and clean code structure

## 🧰 Technologies Used

    🐢 Node.js
    🚂 Express.js
    🛢️ MongoDB
    📦 Mongoose
    🔐 dotenv
    🌐 CORS

## 📥 Getting Started

    1. Clone the repository:
       git clone https://github.com/Mandipstha-17/backend-sms.git

    2. Navigate to the project directory:
       cd backend-sms

    3. Install dependencies:
       npm install

    4. Create a .env file and add the following:
       MONGO_URI=your_mongo_connection_string
       PORT=3000

    5. Start the server:
       node index.js//nodemon index.js

    6. API will be running at:
       http://localhost:5000/api/students

## 🔌 API Endpoints

    GET     /api/students           → Get all students
    GET     /api/students/:id      → Get a student by ID
    POST    /api/students          → Add a new student
    PUT     /api/students/:id      → Update a student
    DELETE  /api/students/:id      → Delete a student


