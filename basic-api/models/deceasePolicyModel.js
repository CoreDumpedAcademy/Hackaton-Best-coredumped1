const mongoose = require('mongoose');
const { Schema } = mongoose;

const lifeDeceaseSchema = new Schema({
	email: { type: String, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: Number, required: true },
  street: { type: String, required: true },
  zipCode: { type: Number, required: true },
  antiquity: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
	documentIdentifier:{type:String, required:true},
	burialPlace:{type:String, required:true}
});

module.exports = mongoose.model('LifeDecease', lifeDeceaseSchema);

