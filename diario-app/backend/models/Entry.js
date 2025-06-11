const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('entry', EntrySchema);