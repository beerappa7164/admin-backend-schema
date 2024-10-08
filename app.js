













// app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const bodyParser = require('body-parser');
const studentRoutes = require('./src/routes/stdreg.routes');
const adminRoutes = require('./src/routes/adminreg.routes');
const instructorRoutes = require('./src/routes/instructorreg.routes');
const studentRouting = require('./src/routes/student.routes');
// const authRoutes = require('./routes/auth.routes');

const path = require('path');
const mongoose = require('mongoose');



// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/instructorlog', instructorRoutes);


// Use CORS to allow requests from frontend
app.use(cors({ origin: process.env.CORS_ORIGIN }));
const apiRoutes = require('./src/routes/api.routes');
app.use(express.json());




// Your existing routes and middleware this is for student login
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Your existing routes and middleware this is for admin login
const adminauthRoutes = require('./src/routes/adminauth');
app.use('/api/adminauth', adminauthRoutes);


// Your existing routes and middleware this is for instructor login
const instructorauthRoutes = require('./src/routes/instructorauth');
app.use('/api/instructorauth', instructorauthRoutes);



const Studentregroutes = require('./src/routes/stdreg.routes');
app.use('/api/stdreg', Studentregroutes);



const Adminregroutes = require('./src/routes/adminreg.routes');
app.use('/api/adminreg', Adminregroutes);

const Instructorregroutes = require('./src/routes/instructorreg.routes');
app.use('/api/instructorreg', Instructorregroutes);



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






























