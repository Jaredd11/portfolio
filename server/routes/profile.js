const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const portfolioData = {
      name: user.name,
      email: user.email,
      role: 'Frontend Developer',
      summary: 'A portfolio app that connects React frontend to Node.js backend and MongoDB.',
      projects: [
        { title: 'Personal Portfolio', description: 'Login/logout with protected backend data.' },
        { title: 'React + Node App', description: 'Secure JWT authentication and MongoDB storage.' },
      ],
    };

    res.json({ user: portfolioData });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
