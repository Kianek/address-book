const mongoose = require('mongoose');
const router = require('express').Router();

router.get('/test', (req, res) => {
  res.json({ msg: 'Contacts works' });
});

module.exports = router;
