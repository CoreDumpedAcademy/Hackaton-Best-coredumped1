const express = require('express');
const api = express.Router();
const DeseaseController = require('../controllers/lifeDeseaseController');

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

api.post('/signup', DeseaseController.newDesesar
