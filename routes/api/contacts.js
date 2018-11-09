const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../../util/auth');
const User = require('../../models/User.js');

router.get('/test', (req, res) => {
  res.json({ msg: 'Contacts works' });
});

// GET /api/contacts/
// Get all contacts
router.get('/', passport.authenticate('local'), (req, res) => {});

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
