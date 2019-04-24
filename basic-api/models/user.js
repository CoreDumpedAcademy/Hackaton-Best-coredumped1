const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: Number, required: true },
  street: { type: String, required: true },
  zipCode: { type: Number, required: true },
  antiquity: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', userSchema);
