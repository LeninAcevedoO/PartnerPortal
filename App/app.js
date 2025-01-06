const express = require('express');
const wreRoutes = require('./proyect.routes.js');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static('./frontend/dist/frontend'));
app.use(wreRoutes);

module.exports = app;