const express = require('express');
const proyectRoutes = require('./proyect.routes.js');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(proyectRoutes);

module.exports = app;