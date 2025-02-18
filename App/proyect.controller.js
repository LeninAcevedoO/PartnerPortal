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
      console.log(req)
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
        .input("modified_by", 0) 
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
      console.log(req)
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
        // .input("modified_by", 0) 
        .execute("spr_pp_updateattentionstatusstatus");
      return ApiResponse(result, res);
    } catch (e) {
      console.log(e);
      return ApiResponse(null, res, "Error update attention status");
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

//#endregion

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
      .input("user_id", -1 ) // req.body.user_id)
      .input("request_type", req.body.request_type)
      .input("details", req.body.details)
      .input("status_id", req.body.status_id)
      .execute("spr_pp_insertrequest");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding request");
  }
};

const updateRequest = async (req, res) => {
  try {
    console.log(req)
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("request_id", req.body.request_id)
      .input("user_id", -1 ) // req.body.user_id)
      .input("request_type", req.body.request_type)
      .input("request_status", req.body.request_status)
      .execute("spr_pp_updatecompanies");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error updating request");
  }
};

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
      .input("status_assign_id", req.body.status_assign_id)
      .input("link_url", req.body.link_url)
      .input("description", req.body.description)
      .input("status_id", req.body.status_id)
      .input("company_id", req.body.company_id)  // Nuevo parámetro
      .input("expiration_date", req.body.expiration_date)  // Nuevo parámetro
      .execute("spr_pp_insertlink");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding link");
  }
};



const updateLink = async (req, res) => {
  try {
    console.log(req)
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("link_id", req.body.link_id)
      .input("status_assign_id", req.body.status_assign_id)
      .input("link_url", req.body.link_url)
      .input("description", req.body.description)
      .input("company_id", req.body.company_id)
      .input("expiration_date", req.body.expiration_date)
      // .input("modified_by", 0)
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
    const result = await pool.request()
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
    const result = await pool.request()
      .input("user_id", -1 ) // req.body.user_id)
      .input("status_assign_id", req.body.status_assign_id)
      .input("comment_title", req.body.comment_title)
      .input("comment_content", req.body.comment_content)
      .input("comment_text", req.body.comment_text)
      .input("modified_by", req.body.modified_by)
      .input("status_id", req.body.status_id)
      .execute("spr_pp_insertmanagementcomment");
    return ApiResponse(result, res);
  } catch (e) {
    console.log(e);
    return ApiResponse(null, res, "Error adding comment");
  }
};

const updateComment = async (req, res) => {
  try {
    console.log(req)
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("comment_id", req.body.comment_id)
      .input("comment_status", req.body.comment_status)
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
};
