const bcrypt = require('bcryptjs');

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({ msg: 'Not logged in' });
  },
  hashPassword: password => {
    if (!password) {
      return null;
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        const hashedPassword = hash;
        return hashedPassword;
      });
    });
  },
};
