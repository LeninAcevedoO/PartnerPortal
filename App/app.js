const express = require('express');
const proyectRoutes = require('./proyect.routes.js');
const cors = require('cors');
const path = require("path");

const app = express();
app.use(cors());

app.use(express.json());
app.use(proyectRoutes);

module.exports = app;