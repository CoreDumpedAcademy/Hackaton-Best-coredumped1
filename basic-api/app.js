const bodyParser = require('body-parser');
const express = require('express');

const lifePolicyRoutes = require('./routes/lifePolicyRoutes');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/lifePolicy', lifePolicyRoutes);


module.exports = app;
