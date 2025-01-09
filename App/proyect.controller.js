const { ApiResponse } = require("./interfaces.model.js");


//#region General

const ConnectionTest = (req, res) => {
    return res.json({ success: "true", message: "Successfull connection", data: {} });
}

const login = async (req, res) => {
    try {
        const result = await pool.request()
        .input('Usuario', sql.VarChar, usuario)
        .input('Token', sql.VarChar, token)
        .input('IdEmpresa', sql.Int, idEmpresa)
        .execute('spr_pp_getLogin');
        if (result.recordset.length <= 0)
            return res.status(401).json({ Exito: "false", mensaje: "Invalid email/password", Data: {} })
        else
            return ApiResponse(result, res)
    } catch (e) {
        console.log(e)
        return ApiResponse(null, res, 'Error al obtener el dashboard')
    }
}


const authValidator = async (req, res, next) => {
    try {
      const usuario = req.headers['usuario'];
      const token = req.headers['authorization']?.replace('Bearer ', '');
      const idEmpresa = req.headers['idempresa'];
  
      if (!usuario || !token || !idEmpresa) {
        return res.status(400).json({ mensaje: 'Faltan datos de autenticación' });
      }
  
      const pool = await sql.connect(dbConfig);
  
      const result = await pool.request()
        .input('Usuario', sql.VarChar, usuario)
        .input('Token', sql.VarChar, token)
        .input('IdEmpresa', sql.Int, idEmpresa)
        .execute('sp_ValidarSesion');
  
      if (result.returnValue !== 0) {
        return res.status(401).json({ mensaje: 'User or token are not valid' });
      }
  
    //   req.usuario = result.recordset[0];
  
      next();
    } catch (err) {
      console.error('Error en la validación:', err);
      res.status(500).json({ mensaje: 'Error interno en la validación' });
    }
}

//#endregion

module.exports = {
    ConnectionTest, login, authValidator
}