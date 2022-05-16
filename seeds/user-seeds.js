const { User } = require('../models');

const UserData = [
  {
    username: 'VictoriaTest',
    email: 'vrice1@gmail.com',
    password: 'pass1'
  },
  {
    username: 'MicheleTest',
    email: 'mrice2@gmail.com',
    password: 'pass2'
  },
  {
    username: 'ClaireTest',
    email: 'crice3@gmail.com',
    password: 'pass3'
  },
  {
    username: 'LarryTest',
    email: 'lrice4@gmail.com',
    password: 'pass4'
  },
  {
    username: 'MichTest',
    email: 'gma5@gmail.com',
    password: 'pass5'
  }
];

const seedUser = () => User.bulkCreate(UserData);

module.exports = seedUser;

