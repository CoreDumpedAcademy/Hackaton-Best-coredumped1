const bodyParser = require('body-parser');
const express = require('express');
const lifePolicyRoutes = require('./routes/lifePolicyRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/lifePolicy', lifePolicyRoutes);
app.use('/test', testRoutes);


module.exports = app;
