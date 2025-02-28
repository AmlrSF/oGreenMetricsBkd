const bcrypt = require('bcrypt');
require('dotenv').config();

const hashPassword = async (plainPassword) => {
  
  const saltRounds = parseInt(process.env.SALT, 10);
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainPassword, salt);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
