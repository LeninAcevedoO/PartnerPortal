const express = require('express');
const proyectRoutes = require('./proyect.routes.js');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static('./frontend/dist/frontend', {
    setHeaders: (res, path) => {
        res.set('Cache-Control', 'no-store');
    },
}));
app.use(proyectRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, './frontend/dist/frontend/index.html'));
});

module.exports = app;