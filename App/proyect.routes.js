const { Router } = require("express");
const {
    ConnectionTest, login, authValidator, getEnterprices, getEnterprice, setEnterprice, updateEnterprice, 
} = require("./proyect.controller.js");

const router = Router();
const urlBase = '/api/pp/v1';

router.get(`${urlBase}/ConnectionTest`, ConnectionTest);

router.post(`${urlBase}/login`, login);
router.post(`${urlBase}/activity`, authValidator, login);


router.get(`${urlBase}/enterprice`, authValidator, getEnterprices);
router.get(`${urlBase}/enterprice/:idEnterprice`, authValidator, getEnterprice);
router.post(`${urlBase}/enterprices`, authValidator, setEnterprice);
router.put(`${urlBase}/enterprice`, authValidator, updateEnterprice);
router.get(`${urlBase}/enterprice/${idEnterprice}`, authValidator, getEnterprices);


module.exports = router;