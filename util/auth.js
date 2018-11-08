const bcrypt = require('bcryptjs');

module.export = {
  hashPassword: password => {
    if (!password) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          const hashedPassword = hash;
          return hashedPassword;
        });
      });
    }
  },
};
