const express = require('express');
const lifePolicyController = require('../controllers/testController');

const api = express.Router();

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

api.post('/', lifePolicyController.test);

module.exports = api;
