const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio backend is running' });
});

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio-app');

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = Number(port) + 1;
      if (nextPort <= 5010) {
        console.warn(`Port ${port} is in use. Trying port ${nextPort}...`);
        startServer(nextPort);
        return;
      }
      console.error(`Ports ${process.env.PORT || 5000}-${nextPort} are in use. Stop the other process or set PORT to a different value.`);
      process.exit(1);
    }
    console.error('Server error:', error);
    process.exit(1);
  });
};

startServer(PORT);
