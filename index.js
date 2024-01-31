const express = require("express");
const connectDB = require("./config/db.js");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");


const authRoutes = require('./routes/auth');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');

dotenv.config();

connectDB();
const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;

app.use('/auth', authRoutes);
app.use('/departments', departmentRoutes);
app.use('/employees', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
