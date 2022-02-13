require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const anegdotsRouter = require('./controllers/anegdots');

// middlewares

// initialize cors middleware
app.use(cors());

// initialize express json middleware
app.use(express.json());

// connect to the MongoDB database
const DB_URI = config.DB_URI;
mongoose.connect(DB_URI)
.then(res => {
    logger.info('Successfuly connected to the MongoDB database');
})
.catch(err => {
    logger.error('MongoDB database cannot be connected');
});

/* Route Middlewares */

// initialize anegdots router
app.use('/anegdots', anegdotsRouter);

// export app
module.exports = app;