const express = require('express');
const lifePolicyController = require('../controllers/lifePolicyController');

const api = express.Router();

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

api.post('/signup', lifePolicyController.signUp);
api.put('/update/:documentIdentifier', lifePolicyController.updateLifePolicyUser);
api.get('/:documentIdentifier', lifePolicyController.getLifePolicyUser);
api.delete('/delete/:documentIdentifier', lifePolicyController.deleteLifePolicyUser);


module.exports = api;
