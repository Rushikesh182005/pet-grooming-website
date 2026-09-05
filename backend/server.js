const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: './config.env' });

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  'https://pet-grooming-website-rushikesh.vercel.app',
  'https://pet-grooming-website-rushikesh-git-main-rushikesh182005.vercel.app',
  'https://pet-grooming-website-rushikesh-rushikesh182005.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      process.env.NODE_ENV !== 'production' ||
      origin.endsWith('.vercel.app') ||
      origin.includes('localhost') ||
      allowedOrigins.includes(origin)
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
let mongoError = null;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-grooming')
  .then(() => {
    mongoError = null;
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    mongoError = err.message || String(err);
    console.error('MongoDB connection error:', err);
  });

mongoose.connection.on('error', err => {
  mongoError = err.message || String(err);
  console.error('MongoDB connection error event:', err);
});

mongoose.connection.on('connected', () => {
  mongoError = null;
  console.log('Mongoose connected event');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const dbStatus = states[mongoose.connection.readyState] || 'unknown';
  
  const rawUri = process.env.MONGODB_URI || '';
  const maskedUri = rawUri
    ? rawUri.replace(/:([^:@]+)@/, ':****@')
    : 'Not set (using localhost fallback: mongodb://localhost:27017/pet-grooming)';

  res.status(200).json({
    status: 'ok',
    message: 'Pet Grooming Backend API is running',
    mongodb: dbStatus,
    mongoDetails: {
      status: dbStatus,
      error: mongoError,
      uriPreview: maskedUri
    },
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/gallery', require('./routes/gallery'));

// Serve React app in production if built locally, otherwise show API status
const frontendBuildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'Pet Grooming API is running successfully' });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
