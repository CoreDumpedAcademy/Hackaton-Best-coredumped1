const mongoose = require('mongoose');
const user = require('./user');

const { Schema } = mongoose;

const lifePolicySchema = new Schema({
  user: { type: user, required: true },
  documentIdentifier: { type: String, required: true },
  familySize: { type: Number, required: true },
  familyBook: { type: String, required: true },
  beneficiary: { type: String, required: true },
  medicalLog: { type: String, required: true },
  hereditaryDiseases: { type: String, default: 'none', required: true },
});

module.exports = mongoose.model('LifePolicy', lifePolicySchema);
