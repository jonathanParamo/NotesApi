const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  hashedPassword: String,
});

userSchema.methods.setPassword = async function (password) {
  const saltRounds = 10;
  this.hashedPassword = await bcrypt.hash(password, saltRounds);
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.hashedPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
