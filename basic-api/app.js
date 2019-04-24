const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const lifePolicyRoutes = require('./routes/lifePolicyRoutes');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/lifePolicyRoutes', userRoutes);



module.exports = app;
