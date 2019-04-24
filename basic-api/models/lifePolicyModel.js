const mongoose = require('mongoose');
const User = require('./user');

const { Schema } = mongoose;

const lifePolicySchema = new Schema({
  documentIdentifier: { type: String, required: true },
  familySize: { type: Number, required: true },
  familyBook: { type: String, required: true },
  beneficiary: { type: String, required: true },
  medicalLog: { type: String, required: true },
  hereditaryDiseases: { type: String, default: 'none', required: true },
});

module.exports = mongoose.model('LifePolicyUser', lifePolicySchema);
