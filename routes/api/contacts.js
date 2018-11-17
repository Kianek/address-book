const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../../util/auth');
const { createContact } = require('../../util/contacts');
const User = require('../../models/User.js');

// TODO: get rid of this later
router.get('/test', (req, res) => {
  res.json({ msg: 'Contacts works' });
});

// TODO: get rid of this later
router.get('/current', (req, res) => {
  res.json(req.user);
});

// GET /api/contacts/
// Get all contacts
router.get('/', ensureAuthenticated, (req, res) => {
  User.findOne({ _id: req.user.id })
    .then(user => {
      if (!user) {
        res.status(404).json({ msg: 'Unable to find user' });
      }
      // If the user is found, return the array of contacts
      res.status(200).json(user.contacts);
    })
    .catch(err => console.log(err));
});

// POST /api/contacts/add
// Add a new contact
router.post('/add', ensureAuthenticated, (req, res) => {
  const { name, phone, email, address } = req.body;

  const query = { _id: req.user.id };
  User.findOne(query)
    .then(user => {
      if (!user) {
        res.status(404).json({ msg: 'Unable to find user' });
      }

      const newContact = { name, phone, email, address };
      user.contacts.unshift(newContact);

      // The client already has the relevant user info,
      // so only return the updated contacts array
      user
        .save()
        .then(user => res.status(201).json(user.contacts))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// PUT /api/contacts/:id/update
// Update a single contact
router.put('/:id/update', ensureAuthenticated, (req, res) => {
  const contactId = req.params.id;

  const query = { _id: req.user.id };
  User.findOne(query)
    .then(user => {
      if (!user) {
        res.status(404).json({ msg: 'Unable to find user' });
      }

      // Locate the contact in the array
      const updateContact = user.contacts.id(contactId);

      // Extract the updated information, and set to a
      // new contact object
      updateContact.set(createContact(req.body));

      user
        .save()
        .then(user => res.status(202).json(user))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// DELETE /api/contacts/:id/delete
// Delete a single contact
router.delete('/:id/delete', ensureAuthenticated, (req, res) => {
  const query = { _id: req.user.id };
  User.findOne(query)
    .then(user => {
      if (!user) {
        res.status(404).json({ msg: 'Unable to find user' });
      }
      const delContact = user.contacts.id(req.params.id);
      user.contacts = user.contacts.filter(
        contact => contact._id !== delContact._id
      );
      console.log(user.contacts);
      user
        .save()
        .then(user => res.status(200).json(user))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// DELETE /api/contacts/delete-all
// Delete all contacts
router.delete('/delete-all', ensureAuthenticated, (req, res) => {
  const query = { _id: req.user.id };
  User.findOne(query)
    .then(user => {
      user.contacts = [];
      // TODO: No need to return the user object
      user
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
