const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: password => {
    console.log(password);
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
