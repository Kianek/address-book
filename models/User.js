const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  contacts: [
    {
      name: {
        first: String,
        middle: String,
        last: String,
      },
      phone: String,
      email: String,
      address: {
        line1: String,
        line2: String,
        city: String,
        state: String,
        zip: String,
      },
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
