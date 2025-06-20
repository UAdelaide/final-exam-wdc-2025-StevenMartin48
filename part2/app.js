const express = require('express');
const path = require('path');
require('dotenv').config();
var logger = require('morgan');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(logger('dev'));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const index = require('./routes/index.js');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/', index);

// Export the app instead of listening here
// module.exports = app;

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});