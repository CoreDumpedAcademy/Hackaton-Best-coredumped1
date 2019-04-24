const express = require('express');
const lifePolicyController = require('../controllers/lifePolicyController');

const api = express.Router();

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

api.post('/lifePolicy/signup', lifePolicyController.signUp);
api.put('/lifePolicy/update/:documentIdentifier', lifePolicyController.updateLifePolicyUser);
api.get('/lifePolicy/:documentIdentifier', lifePolicyController.getLifePolictUser);


module.exports = api;
