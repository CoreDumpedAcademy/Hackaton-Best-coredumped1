const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: Number },
  street: { type: String, required: true },
  zipCode: { type: Number, required: true },
  antiquity: { type: Number, required: true },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', userSchema);
