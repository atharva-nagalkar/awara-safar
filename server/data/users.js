const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '9999999999',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    password: bcrypt.hashSync('123456', 10),
    role: 'user',
  },
];

module.exports = users;
