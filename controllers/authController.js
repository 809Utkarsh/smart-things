const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2h' });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  await user.save();
  const token = generateToken(user._id);

  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id);
  res.json({ token });
};
