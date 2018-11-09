const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const { ensureAuthenticated } = require('../../util/auth');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.get('/test', (req, res) => {
  res.json({ msg: 'Users works' });
});

// GET /api/users/login
router.get('/login', ensureAuthenticated, (req, res) => {
  res.json({ msg: 'Logged in' });
});

// POST /api/users/login
router.post('/login', passport.authenticate('local'), (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.status(404).json({ msg: 'That email is not registered' });
    }

    res.status(200).json(user);
  });
});

// GET /api/users/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ msg: 'Logged out' });
});

// POST /api/users/register
// Register a new user
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      res.status(400).json({ err: 'That email is already registered' });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

module.exports = router;
