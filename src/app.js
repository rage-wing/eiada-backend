const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const DB = require('./db');
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

// overrides
app.response.sends = response;

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
