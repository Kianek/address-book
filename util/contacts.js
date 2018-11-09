module.exports = {
  createContact: contact => {
    if (!contact) {
      return null;
    }
    const { name, phone, email, address } = contact;

    return {
      name: {
        first: name.first,
        middle: name.middle,
        last: name.last,
      },
      phone,
      email,
      address: {
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        zip: address.zip,
      },
    };
  },
};
