const { Router } = require("express");
const {
    ConnectionTest, login,
} = require("./proyect.controller.js");

const router = Router();
const urlBase = '/api/proyect/v1';

router.get(`${urlBase}/ConnectionTest`, ConnectionTest);

router.post(`${urlBase}/login`, login);


module.exports = router;