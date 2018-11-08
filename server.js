const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

// Initialize Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

//
