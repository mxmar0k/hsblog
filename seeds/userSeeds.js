const { User } = require('../models');

const userData = [
  {
    username: 'JainaProudmoore',
    email: 'jaina@example.com',
    password: 'password123',
  },
  {
    username: 'Thrall',
    email: 'thrall@example.com',
    password: 'securepassword',
  },
  {
    username: 'SylvanasWindrunner',
    email: 'sylvanas@example.com',
    password: 'mysecretpass',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
