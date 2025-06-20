const express = require('express');
const path = require('path');
require('dotenv').config();
var logger = require('morgan');
const app = express();
app.use(logger('dev'));

const session = require('express-session');
app.use(session(
app
  secret: 'himitsu',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 31,
    secure: false
   }
  }
));
const cookieParser = require('cookie-parser');
router.use(cookieParser());


// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));


// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const index = require('./routes/index.js');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/', index);

// Export the app instead of listening here
module.exports = app;
