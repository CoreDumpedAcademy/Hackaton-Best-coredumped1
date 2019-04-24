const mongoose = require('mongoose');
const user = require('./user');
const { Schema } = mongoose;

const lifeDeceaseSchema = new Schema({
	user:{type:user, required:true},
	documentIdentifier:{type:String, required:true},
	burialPlace:{type:String, required:true}
});

module.exports = mongoose.model('LifeDecease', lifeDeceaseSchema);

