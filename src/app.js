const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const DB = require('./db');
require('dotenv').config();

const { errorHandler, notFound } = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// mongoose connect
DB.connect();

// routes
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
