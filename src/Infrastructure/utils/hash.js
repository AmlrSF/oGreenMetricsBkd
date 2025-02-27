const bcrypt = require('bcrypt');
require('dotenv').config();

const hashPassword = async (plainPassword) => {
  const saltRounds = process.env.SALT;
  return await bcrypt.hash(plainPassword, saltRounds);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
