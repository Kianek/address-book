const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../../util/auth');
const User = require('../../models/User.js');

router.get('/test', (req, res) => {
  res.json({ msg: 'Contacts works' });
});

router.get('/current', (req, res) => {
  res.json(req.user);
});

// GET /api/contacts/
// Get all contacts
router.get('/', ensureAuthenticated, (req, res) => {
  User.findOne({ _id: req.user.id })
    .then(user => {
      if (!user) {
        res.status(404).json({ msg: 'No such user' });
      }
      // If the user is found, return the array of contacts
      res.status(200).json(user.contacts);
    })
    .catch(err => console.log(err));
});

// POST /api/contacts/add
// Add a new contact
router.post('/add', (req, res) => {});

// PUT /api/contacts/:id/update
// Update a single contact
router.put('/:id/update', (req, res) => {});

// DELETE /api/contacts/:id/delete
// Delete a single contact
router.delete('/:id/delete', (req, res) => {});

// DELETE /api/contacts/delete-all
// Delete all contacts
router.delete('/delete-all', (req, res) => {});

module.exports = router;
