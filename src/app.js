const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const DB = require('./db');
const cloudinary = require('cloudinary');
require('dotenv').config();

const { errorHandler, notFound } = require('./middlewares/errorHandler');
const routes = require('./routes');
const response = require('./utils/response');

const app = express();

// middlewares
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// overrides
app.response.sends = response;

// services inits
DB.connect();
require('./models/Doctor');
require('./models/User');
require('./models/Appointment');

// routes
app.use(express.static('public'));
app.get('/', (_req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏👋✨🌈🦄',
  });
});

// api routes
app.use('/api', routes);

// error routes
app.use(notFound);
app.use(errorHandler);

module.exports = app;
