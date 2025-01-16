const { ApiResponse } = require("./interfaces.model.js");
const dbConfig = require("./db.config.js");
const sql = require("mssql");

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
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("Usuario", usuario)
      .input("Token", token)
      .input("IdEmpresa", idEmpresa)
      .execute("spr_pp_getLogin");
    if (result.recordset.length <= 0)
      return res
        .status(401)
        .json({ Exito: "false", mensaje: "Invalid email/password", Data: {} });
    else return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error al obtener el dashboard");
  }
};

const authValidator = async (req, res, next) => {
  next();
  return;
  try {
    const usuario = req.headers["usuario"];
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const idEmpresa = req.headers["idempresa"];

    if (!usuario || !token || !idEmpresa) {
      return res.status(400).json({ mensaje: "Faltan datos de autenticación" });
    }

    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("Usuario", sql.VarChar, usuario)
      .input("Token", sql.VarChar, token)
      .input("IdEmpresa", sql.Int, idEmpresa)
      .execute("sp_ValidarSesion");

    if (result.returnValue !== 0) {
      return res.status(401).json({ mensaje: "User or token are not valid" });
    }

    //   req.usuario = result.recordset[0];

    next();
  } catch (err) {
    console.error("Error en la validación:", err);
    res.status(500).json({ mensaje: "Error interno en la validación" });
  }
};

//#endregion

//#region Administrations

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
    console.log(req)
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("company_id", req.body.company_id)
      .input("company_name", req.body.company_name)
      .input("legal_name", req.body.legal_name)
      .input("company_email", req.body.company_email)
      .input("phone_number", req.body.phone_number)
      .input("address", req.body.address)
      .input("modified_by", 0)
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
      .input("modified_by", 0)
      .execute("spr_pp_updateEnterpricesStatus");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error update enterprice status");
  }
};

//#endregion

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
      .execute("spr_pp_getRole");
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
      .execute("spr_pp_insertroles");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding role");
  }
};

const updateRole = async (req, res) => {
  try {
    console.log(req)
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .request()
      .input("role_name", req.body.role_name)
      .input("description", req.body.description)
      .input("modified_by", 0)
      .execute("spr_pp_updateroles");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating roles");
  }
};

const updateRoleStatus = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("role_id", req.params.role_id)
      .input("status_id", req.params.status)
      .input("modified_by", 0)
      .execute("spr_pp_updateRolesStatus");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error update role status");
  }
};

//#enregion

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
  getRoles,
  getRole,
  setRole,
  updateRole,
  updateRoleStatus
};
