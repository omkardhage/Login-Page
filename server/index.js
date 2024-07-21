const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());  // Middleware to parse JSON request bodies
app.use(cors());  // Middleware to enable CORS

mongoose.connect('mongodb://127.0.0.1:27017/employee', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Endpoint to check email availability
app.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json("Email is required");
    }

    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User with this email already exists");
    }

    res.json("Email is available");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// Registration endpoint
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Register Request Body:', req.body);

    if (!name || !email || !password) {
      return res.status(400).json("Name, email, and password are required");
    }

    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User with this email already exists");
    }

    const newUser = await EmployeeModel.create({ name, email, password });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
