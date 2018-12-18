const express = require('express');
const path = require('path');
const session = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const contacts = require('./routes/api/contacts');
const users = require('./routes/api/users');

const app = express();

// Configure Passport
require('./config/passport')(passport);

// Initialize Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    name: 'session',
    keys: ['secret'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Initialize MongoDB
const db = require('./config/keys').mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Load Routes
app.use('/api/users', users);
app.use('/api/contacts', contacts);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
