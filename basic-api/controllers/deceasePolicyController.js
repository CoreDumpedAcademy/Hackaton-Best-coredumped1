const LifeDecease = require('../models/deceasePolicyModel');

function createLifeDecease(req, res, next){
	const lifeDecease = req.body;
	const dni = req.body.documentIdentifier;
	const newPolicy = new LifeDecease(lifeDecease);
	let finded = true;
	LifeDecease.findOne({documentIdentifier:dni}, (err, user) =>{
		if(err){
			res.status.send('Error: ' + err);
			return next(err);
		}
		if(user){
			return res.status(500).send("Este usuario ya esta registrado");
		}else{
			newPolicy.save((err, policy) => {
				if(err){
					res.status(500).send("Error: " + err);
					return next(err);
				}else{
					return res.status(200).send(policy);
				}
			});
		}
	});
}

function getLifeDecease(req, res){
	const dni = req.params.documentIdentifier;
	LifeDecease.findOne({documentIdentifier:dni},(err, policy) => {
		if(err){
			res.status(500).send("Error: " + err);
			return next(err);
		}
		if(policy){
		return res.status(200).send(policy);
		}else{
			return res.status(500).send({error:'Policy not finded'});
		}
	});
}

function updateLifeDecease(req, res){
	const dni = req.params.documentIdentifier;
	const newPolicy = req.params;
	if(dni != null){
		LifeDecease.findOneAndUpdate({documentIdentifier: dni}, {$set:{newPolicy}}, (err) => {
			if(err){
				res.status(500).send("Error: " + err);
			}else{
				res.status(200).send("Policy Updated");
			}
		});
	}
}
function deleteLifeDecease(req, res, next){
	const dni = req.params.documentIdentifier;
	if(dni != null){
		LifeDecease.findOneAndDelete({documentIdentifier:dni}, (err) => {
			if(err){
				res.status(500).send("Error: " + err);
				return next(err);
			}else{
				return res.status(200).send("Policy Deleted")
			}
		});
	}
}

module.exports = {
	getLifeDecease,
createLifeDecease,
updateLifeDecease,
deleteLifeDecease,

}
