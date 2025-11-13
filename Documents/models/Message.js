const mongoose = require('mongoose');

// Message schema storing sender, receiver, content, and timestamp
const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the sender user
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the receiver user
  content: { type: String, required: true }, // The message content
  timestamp: { type: Date, default: Date.now } // Timestamp of when the message was sent
});

module.exports = mongoose.model('Message', messageSchema);