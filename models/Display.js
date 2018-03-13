var mongoose = require('mongoose');

var DisplaySchema = new mongoose.Schema({
    name: String,
    description: String,
    votes: Number,
    updated_at: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('Display', DisplaySchema);