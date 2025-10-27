const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authorRoutes = require('./routes/author.routes');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');
const loanRoutes = require('./routes/loan.routes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/authors', authorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);

app.use(errorHandler);

module.exports = app;