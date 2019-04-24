const express = require('express');
const testController = require('../controllers/testController');

const api = express.Router();

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

api.post('/', testController.postTest);
api.get('/', testController.getTest);

module.exports = api;
