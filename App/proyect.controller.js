const { ApiResponse } = require("./interfaces.model.js");
const dbConfig = require("./db.config.js");
const utils = require("./utils.service.js");
const sql = require("mssql");
const { token } = require("morgan");

//#region General

const ConnectionTest = (req, res) => {
  return res.json({
    success: "true",
    message: "Successfull connection",
    data: {},
  });
};

const login = async (req, res) => {
  try {
    req.body = JSON.parse(utils.decryptAES(req.body.data));
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("email", req.body.email)
      .execute("spr_pp_getpasswordbyemail");
    result.recordset[0].password_hash = utils.extractValidString(result.recordset[0].password_hash);
    const token = utils.generateToken();
    await pool
      .request()
      .input("user_id", result.recordset[0].user_id)
      .input("token", token)
      .input("ip_address", req.headers['x-client-ip'])
      .input("device_info", req.headers['x-device-info'])
      .input("status_id", utils.decryptAES(result.recordset[0].password_hash) === req.body.password ? 1 : 0)
      .execute("spr_pp_insertlogintry");
    if (result.recordset.length <= 0)
      return res
        .status(401)
        .json({ Exito: "false", mensaje: "Invalid email/password", Data: {} });
    else if (utils.decryptAES(result.recordset[0].password_hash) === req.body.password) {
      let R_info = await pool
        .request()
        .input("email", req.body.email)
        .execute("spr_pp_getlogininformation");
      R_info.recordset[0] = [
        { ...R_info.recordset[0], token: token },
      ];
      return ApiResponse(R_info, res);
    } else
      return res.status(401).json({ Exito: "false", mensaje: "Invalid email/password", Data: {} });
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error al logearte");
  }
};

const logout = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
    .request()
    .input('token', req.headers['authorization'].replace('Bearer ', ''))
    .execute("spr_pp_updatelogout")

    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting enterprices");
  }
};

const authValidator = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const currentRoute = req.headers["x-current-route"];
    const user_id = utils.decryptAES(req.headers["x-user"]);
    const company_id = utils.decryptAES(req.headers["x-company"]);
    console.log(user_id)
    console.log(token)
    console.log(company_id)

    if (!user_id || !token || !company_id)
      return res.status(400).json({ mensaje: "Your auth data isn't available" });

    if (req.body.data) {
      try {
        const decryptedData = utils.decryptAES(req.body.data);
        req.body = JSON.parse(decryptedData);
        console.log(req.body);
      } catch (error) {
        console.error("Error al desencriptar el body:", error);
        return res
          .status(400)
          .json({ message: "Error al procesar la solicitud" });
      }
    }

    // next();
    // return;

    const pool = await sql.connect(dbConfig);
    // const tokenVal = await pool
    //   .request()
    //   .input("Usuario", sql.VarChar, user_id)
    //   .input("Token", sql.VarChar, token)
    //   .input("IdEmpresa", sql.Int, company_id)
    //   .execute("sp_ValidarSesion");
      
    // if (tokenVal.recordset[0]?.estatus_id == 0 || tokenVal.recordset[0]?.token !== token) {
    //   return res.status(401).json({ mensaje: "User or token are not valid" });
    // }
    
    await pool.request()
      .input("user_id", user_id)
      .input("activity_type", 'request')
      .input("trail", currentRoute)
      .input("token", token)
      .execute("spr_pp_insertactivity");

    next();
  } catch (err) {
    console.error("Error en la validación:", err);
    res.status(500).json({ mensaje: "Error interno en la validación" });
  }
};

//#endregion

//#region Catalogs

const getCatEnterprices = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getCatCompanies");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting requests");
  }
};

const getCatRoles = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getCatRoles");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting requests");
  }
};

const getCatStatusAttendant = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getCatAttentionStatus");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting requests");
  }
};

const getCatStatus = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getCatStatus");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting requests");
  }
};

const getCatMediaType = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getCatMediaTypes");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting requests");
  }
};

//#endregion

//#region Administration

//#region Enterprices

const getEnterprices = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getcompanies");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting enterprices");
  }
};

const getEnterprice = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("company_id", req.params.company_id)
      .execute("spr_pp_getEnterprice");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting enterprice");
  }
};

const setEnterprice = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("company_name", req.body.company_name)
      .input("legal_name", req.body.legal_name)
      .input("company_email", req.body.company_email)
      .input("phone_number", req.body.phone_number)
      .input("address", req.body.address)
      .input("modified_by", -1)
      .execute("spr_pp_insertcompanies");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding enterprice");
  }
};

const updateEnterprice = async (req, res) => {
  try {
    console.log(req);
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("company_id", req.body.company_id)
      .input("company_name", req.body.company_name)
      .input("legal_name", req.body.legal_name)
      .input("company_email", req.body.company_email)
      .input("phone_number", req.body.phone_number)
      .input("address", req.body.address)
      .input("modified_by", -1)
      .execute("spr_pp_updatecompanies");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating enterprice");
  }
};

const updateEnterpriceStatus = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("company_id", req.params.company_id)
      .input("status_id", req.params.status)
      .input("modified_by", -1)
      .execute("spr_pp_updatecompanystatus");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error update enterprice status");
  }
};

//#endregion

//#region Users

const getUsers = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getusers");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting users");
  }
};

const getUser = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("user_id", req.params.user_id)
      .execute("spr_pp_getuser");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting user");
  }
};

const setUser = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("password_hash", req.body.password_hash)
      .input("email", req.body.email)
      .input("first_name", req.body.first_name)
      .input("last_name", req.body.last_name)
      .input("phone_number", req.body.phone_number)
      .input("role_id", req.body.role_id)
      .input("company_id", req.body.company_id)
      .input("status_id", req.body.status_id)
      .input("modified_by", -1)
      .execute("spr_pp_insertuser");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding user");
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req);
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("user_id", req.body.user_id)
      .input("password_hash", req.body.password_hash)
      .input("email", req.body.email)
      .input("first_name", req.body.first_name)
      .input("last_name", req.body.last_name)
      .input("phone_number", req.body.phone_number)
      .input("role_id", req.body.role_id)
      .input("company_id", req.body.company_id)
      .input("status_id", req.body.status_id)
      .input("modified_by", -1)
      .execute("spr_pp_updateuser");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating user");
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("user_id", req.params.user_id)
      .input("status_id", req.params.status)
      .input("modified_by", -1)
      .execute("spr_pp_updateuserstatus");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error update user status");
  }
};

//#endregion

//#region AttentionStatus

const getAllAttentionStatus = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getattentionstatus");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting attention status");
  }
};

const setAttentionStatus = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("attention_status_name", req.body.attention_status_name)
      .input("description", req.body.description)
      .input("charging_order", req.body.charging_order)
      .input("color", req.body.color)
      .input("modified_by", -1)
      .execute("spr_pp_insertattentionstatus");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding attention status");
  }
};

const updateAttentionStatus = async (req, res) => {
  try {
    console.log(req);
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("attention_status_id", req.body.attention_status_id)
      .input("attention_status_name", req.body.attention_status_name)
      .input("description", req.body.description)
      .input("charging_order", req.body.charging_order)
      .input("color", req.body.color)
      .input("modified_by", -1)
      .execute("spr_pp_updateattentionstatus");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating attention status");
  }
};

const updateAttentionStatusStatus = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("attention_status_id", req.params.attention_id)
      .input("status_id", req.params.status)
      // .input("modified_by", -1)
      .execute("spr_pp_updateattentionstatusstatus");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error update attention status");
  }
};

//#endregion

//#region Product details / requests

const getRequests = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getrequests");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting requests");
  }
};

const getRequest = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("request_id", req.params.request_id)
      .execute("spr_pp_getrequest");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting request");
  }
};

const setRequest = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("user_id", -1) // req.body.user_id)
      .input("request_type", req.body.request_type)
      .input("details", req.body.details)
      .input("status_id", req.body.status_id)
      .input("company_id", req.body.company_id)
      .execute("spr_pp_insertrequest");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding request");
  }
};

const updateRequest = async (req, res) => {
  try {
    console.log(req);
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("request_id", req.body.request_id)
      .input("user_id", -1) // req.body.user_id)
      .input("request_type", req.body.request_type)
      .input("request_status", req.body.request_status)
      .execute("spr_pp_updatecompanies");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating request");
  }
};

//#region Roles

const getRoles = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getroles");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting roles");
  }
};

const getRole = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("role_id", req.params.role_id)
      .execute("spr_pp_getrole");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting role");
  }
};

const setRole = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("role_name", req.body.role_name)
      .input("description", req.body.description)
      .input("modified_by", -1)
      // .input("status_id", req.body.status_id)
      .execute("spr_pp_insertrole");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding role");
  }
};

const updateRole = async (req, res) => {
  try {
    console.log(req);
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("role_id", req.body.role_id)
      .input("role_name", req.body.role_name)
      .input("description", req.body.description)
      .input("modified_by", -1)
      .execute("spr_pp_updaterole");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating role");
  }
};

const updateRoleStatus = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("role_id", req.params.role_id)
      .input("status_id", req.params.status)
      .input("modified_by", -1)
      .execute("spr_pp_updaterolestatus");

    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating role status");
  }
};
//#endregion

//#region Media Links

const getLinks = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getlinks");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting links");
  }
};

const getLink = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("link_id", req.params.link_id)
      .execute("spr_pp_getlink");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting link");
  }
};

const setLink = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("attention_status_id", req.body.status_assign_id)
      .input("link_url", req.body.link_url)
      .input("description", req.body.description)
      .input("status_id", req.body.status_id)
      .input("company_id", req.body.company_id)
      .input("expiration_date", req.body.expiration_date)
      .input("multimedia_id", req.body.multimedia_id)
      .input("modified_by", req.body.modified_by)
      .execute("spr_pp_insertlink");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding link");
  }
};

const updateLink = async (req, res) => {
  try {
    console.log(req);
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("link_id", req.body.link_id)
      .input("attention_status_id", req.body.attention_status_id)
      .input("link_url", req.body.link_url)
      .input("description", req.body.description)
      .input("status_id", req.body.status_id)
      .input("company_id", req.body.company_id)
      .input("expiration_date", req.body.expiration_date)
      .input("modified_by", -1)
      .execute("spr_pp_updatelink");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating link");
  }
};

const updateLinkStatus = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("link_id", req.body.link_id)
      .input("status_id", req.body.status_id)
      .input("modified_by", 0)
      .execute("spr_pp_updatelinkstatus");

    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating link status");
  }
};

//#endregion

//#endregion

//#region Manager Comments

const getComments = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute("spr_pp_getmanagercomments");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting comments");
  }
};

const getComment = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("comment_id", req.params.comment_id)
      .execute("spr_pp_getmanagercomment");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error getting comment");
  }
};

const setComment = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("user_id", -1) // req.body.user_id)
      .input("attention_status_id", req.body.attention_status_id)
      .input("comment_title", req.body.comment_title)
      .input("comment_content", req.body.comment_content)
      .input("modified_by", req.body.modified_by)
      // .input("route", req.body.route)
      .execute("spr_pp_insertmanagementcomment");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding comment");
  }
};

const updateComment = async (req, res) => {
  try {
    console.log(req);
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("comment_id", req.body.comment_id)
      .input("attention_status_id", req.body.attention_status_id)
      .input("comment_response", req.body.comment_response)
      .input("comment_solution", req.body.comment_solution)
      .execute("spr_pp_updatecomment");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating comment");
  }
};

//#endregion

//#region Favorites
  const getFavorites = async (req, res) =>{
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().execute("spr_pp_getfavorites");
      return ApiResponse(result, res);
    } catch (e) {
      console.log(e);
      return ApiResponse(null, res, "Error getting favorites");
    }
  }
//#endregion

module.exports = {
  ConnectionTest,
  login,
  authValidator,
  getEnterprices,
  getEnterprice,
  setEnterprice,
  updateEnterprice,
  updateEnterpriceStatus,
  getUsers,
  getUser,
  setUser,
  updateUser,
  updateUserStatus,
  getRoles,
  getRole,
  setRole,
  updateRole,
  updateRoleStatus,
  getLinks,
  getLink,
  setLink,
  updateLink,
  updateLinkStatus,
  getRequests,
  getRequest,
  setRequest,
  updateRequest,
  getCatEnterprices,
  getCatRoles,
  getCatStatusAttendant,
  getCatStatus,
  getComments,
  getComment,
  setComment,
  updateComment,
  getCatMediaType,
  getAllAttentionStatus,
  setAttentionStatus,
  updateAttentionStatus,
  updateAttentionStatusStatus,
  logout
  getFavorites
};
