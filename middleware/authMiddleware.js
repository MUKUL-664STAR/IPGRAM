const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const secretKey = process.env.SECRET_KEY;

exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

exports.isManager = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    if (!user || user.role !== 'manager') {
      return res.status(403).json({ error: 'Unauthorized - Only managers can perform this action' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
