const bodyParser = require('body-parser');
const express = require('express');
const lifePolicyRoutes = require('./routes/lifePolicyRoutes');
const testRoutes = require('./routes/testRoutes');
const deceasePolicyRoutes = require('./routes/deceasePolicyRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/lifePolicy', lifePolicyRoutes);
app.use('/test', testRoutes);
app.use('/deceasePolicy', deceasePolicyRoutes);


module.exports = app;
