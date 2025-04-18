const { Router } = require("express"); 

const {
     ConnectionTest, login, authValidator, getEnterprices,  getEnterprice, setEnterprice, updateEnterprice, updateEnterpriceStatus, getUsers, getUser, setUser, updateUser, updateUserStatus, getCatEnterprices, getCatRoles, getCatStatusAttendant, getCatStatus, getComments, getComment, setComment, updateComment, getRoles,getRole,setRole,updateRole,updateRoleStatus, getRequests, getRequest, setRequest, updateRequest, getLinks, getLink, setLink, updateLink, updateLinkStatus, getCatMediaType, getAllAttentionStatus, setAttentionStatus, updateAttentionStatus, updateAttentionStatusStatus, logout,getFavorites, getDemos, getDemosByVertical, setDemos,updateStatusDemo, updateDemos, setFavorites, updateFavorites, getInformation, getLinksToShow
} = require("./proyect.controller.js");

const router = Router();
const urlBase = '/api/pp/v1';

//#region General

router.get(`${urlBase}/ConnectionTest`, ConnectionTest);

router.post(`${urlBase}/login`, login);
router.post(`${urlBase}/logout`, logout);
router.post(`${urlBase}/activity`, authValidator, login);

//#endregion

//#region Catalogs

router.get(`${urlBase}/catalogs/enterprices`, getCatEnterprices);
router.get(`${urlBase}/catalogs/roles`, getCatRoles);
router.get(`${urlBase}/catalogs/status/attendant`, authValidator, getCatStatusAttendant);
router.get(`${urlBase}/catalogs/estatus`, authValidator, getCatStatus);
router.get(`${urlBase}/catalogs/media-types`, authValidator, getCatMediaType); 

//#endregion

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

    //#endregion

    //#region Users

    router.get(`${urlBase}/users`, authValidator, getUsers);
    router.get(`${urlBase}/users/:user_id`, authValidator, getUser);
    router.post(`${urlBase}/users`, setUser);
    router.put(`${urlBase}/users`, authValidator, updateUser);
    router.put(`${urlBase}/users/:user_id/status/:status`, authValidator, updateUserStatus);

    //#endregion

    //#region Links
    
    //router.get(`${urlBase}/links`, authValidator, getLinks);
    router.get(`${urlBase}/links`, getLinks);
    router.get(`${urlBase}/links/show`, authValidator, getLinksToShow);
    //router.get(`${urlBase}/links/:link_id`, authValidator, getLink);
    router.get(`${urlBase}/links/:link_id`, getLink);
    router.post(`${urlBase}/links`, authValidator, setLink);
    router.put(`${urlBase}/links`, authValidator, updateLink);
    router.put(`${urlBase}/links/:link_id/status/:status`, authValidator, updateLinkStatus);

    //#endregion


    //#region Attentions Status

    router.get(`${urlBase}/attention`, authValidator, getAllAttentionStatus);
    router.post(`${urlBase}/attention`, authValidator, setAttentionStatus);
    router.put(`${urlBase}/attention`, authValidator, updateAttentionStatus);
    router.put(`${urlBase}/attention/:attention_id/status/:status`, authValidator, updateAttentionStatusStatus);

    //#endregion

//#endregion

//#region Product details / requests

router.get(`${urlBase}/products`, authValidator, getRequests);
router.get(`${urlBase}/products/:request_id`, authValidator, getRequest);
router.post(`${urlBase}/products`, authValidator, setRequest);
router.put(`${urlBase}/products`, authValidator, updateRequest);

//#endregion

//#region Manager Comments

router.get(`${urlBase}/comments`, authValidator, getComments);
router.get(`${urlBase}/comments/:comment_id`, authValidator, getComment);
router.post(`${urlBase}/comments`, authValidator, setComment);
router.put(`${urlBase}/comments`, authValidator, updateComment);

//#endregion

//#region Favorites

//router.get(`${urlBase}/favorites`, authValidator, getFavorites);
router.get(`${urlBase}/favorites`, getFavorites);
router.post(`${urlBase}/favorites`, setFavorites);
router.put(`${urlBase}/favorites`, updateFavorites);

//#endregion

//#region Demos

router.get(`${urlBase}/demos/:demo_id`, getDemos);
router.get(`${urlBase}/demos/verticals/:vertical_id`, getDemosByVertical);
router.post(`${urlBase}/demos`,authValidator, setDemos);
router.put(`${urlBase}/demos`, authValidator, updateDemos);
router.put(`${urlBase}/demos/:demo_id/status/:demo_status`, updateStatusDemo);

//#endregion

//#region Information

router.get(`${urlBase}/information`, getInformation);



module.exports = router;