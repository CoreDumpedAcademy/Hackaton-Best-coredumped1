const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageIn = new Schema({
  message: { type: String, required: true },
});

module.exports = mongoose.model('test', messageIn);
