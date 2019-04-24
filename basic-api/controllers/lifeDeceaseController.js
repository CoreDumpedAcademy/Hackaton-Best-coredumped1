const LifeDecease = require('../models/lifeDeceaseModel');

function createLifeDecease(req, res, next){
	const lifeDecease = req.body;
	const dni = req.body.documentIdentifier;
	const newPolicy = new LifeDecease(lifeDecease);
	let finded = true;
	LifeDecease.finOne({documentIdentifier:dni}, (err, user) =>{
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
	const dni = req.body.documentIdentifier;
	LifeDecease.findOne({documentIdentifier:dni},(err, policy) => {
		if(err){
			res.status(500).send("Error: " + err);
			return next(err);
		}
		if(policy){
		return res.status(200).send({identifier:policy.documentIdentifier});
		}else{
			return res.status(500).send({error:'Policy not finded'});
		}
	});
}

function updateLifeDecease(req, res){
	const dni = req.body.documentIdentifier;
	if(dni != null){
		LifeDecease.findOneAndUpdate({documentIdentifier: dni}, {$set:{req.body}}, (err) => {
			if(err){
				res.status(500).send("Error: " + err);
			}else{
				res.status(200).send("Policy Updated");
			}
		}
	}
}
function deleteLifeDecease(req, res, next){
	const dni = req.body.documentIdentifier;
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


