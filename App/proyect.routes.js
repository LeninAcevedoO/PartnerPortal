const { Router } = require("express");
const {
    ConnectionTest, login, authValidator, 
    getEnterprices, getEnterprice, setEnterprice, updateEnterprice, updateEnterpriceStatus, 
    getUsers, getUser, setUser, updateUser, updateUserStatus,
    getRoles,getRole,setRole,updateRole,updateRoleStatus,
    getLinks, getLink, setLink, updateLink, updateLinkStatus,
    getRequests, getRequest, setRequest, updateRequest,
} = require("./proyect.controller.js");

const router = Router();
const urlBase = '/api/pp/v1';

router.get(`${urlBase}/ConnectionTest`, ConnectionTest);

router.post(`${urlBase}/login`, login);
router.post(`${urlBase}/activity`, authValidator, login);

//#region Administration

    //#region Enterprices

    router.get(`${urlBase}/enterprice`, authValidator, getEnterprices);
    router.get(`${urlBase}/enterprice/:company_id`, authValidator, getEnterprice);
    router.post(`${urlBase}/enterprice`, authValidator, setEnterprice);
    router.put(`${urlBase}/enterprice`, authValidator, updateEnterprice);
    router.put(`${urlBase}/enterprice/:company_id/status/:status`, authValidator, updateEnterpriceStatus);

    //#endregion

    //#region Roles

    router.get(`${urlBase}/role`, authValidator, getRoles);
    router.get(`${urlBase}/role/:role_id`, authValidator, getRole);
    router.post(`${urlBase}/role`, authValidator, setRole);
    router.put(`${urlBase}/role`, authValidator, updateRole);
    router.put(`${urlBase}/role/:role_id/status/:status`, authValidator, updateRoleStatus);

    //#end Region

    //#region Users

    router.get(`${urlBase}/users`, authValidator, getUsers);
    router.get(`${urlBase}/users/:user_id`, authValidator, getUser);
    router.post(`${urlBase}/users`, authValidator, setUser);
    router.put(`${urlBase}/users`, authValidator, updateUser);
    router.put(`${urlBase}/users/:user_id/status/:status`, authValidator, updateUserStatus);

    //#endregion

    //#region Links
    
    router.get(`${urlBase}/links`, authValidator, getLinks);
    router.get(`${urlBase}/links/:link_id`, authValidator, getLink);
    router.post(`${urlBase}/links`, authValidator, setLink);
    router.put(`${urlBase}/links`, authValidator, updateLink);
    router.put(`${urlBase}/links/:link_id/status/:status`, authValidator, updateLinkStatus);

    //#end Region

    //#region Roles

    router.get(`${urlBase}/role`, authValidator, getRoles);
    // router.get(`${urlBase}/role/:role_id`, authValidator, getRole);
    router.post(`${urlBase}/role`, authValidator, setRole);
    router.put(`${urlBase}/role`, authValidator, updateRole);
    router.put(`${urlBase}/role/:role_id/status/:status`, authValidator, updateRoleStatus);

    //#endregion

    //#region Product details / requests

    router.get(`${urlBase}/products`, authValidator, getRequests);
    router.get(`${urlBase}/products/:request_id`, authValidator, getRequest);
    router.post(`${urlBase}/products`, authValidator, setRequest);
    router.put(`${urlBase}/products`, authValidator, updateRequest);

    //#endregion

//#endregion

module.exports = router;