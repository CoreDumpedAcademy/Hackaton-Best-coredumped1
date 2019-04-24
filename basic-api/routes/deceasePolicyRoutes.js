const express = require('express');
const api = express.Router();
const DeceaseController = require('../controllers/deceasePolicyController');

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

api.post('/signup', DeceaseController.createLifeDecease);

module.exports = api;