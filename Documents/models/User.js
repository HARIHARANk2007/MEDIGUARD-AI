const mongoose = require('mongoose');

// User schema with fields for username, email, password, avatar, and online status
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true }, // Path to the selected avatar image
  isOnline: { type: Boolean, default: false } // Tracks if the user is currently online
});

module.exports = mongoose.model('User', userSchema);