const utils = require("./utils.js");

const ApiResponse = (poolResult, res, mensaje) => {
  try {
    console.log(poolResult)
    // utils.logErrorToFile(JSON.stringify(poolResult));
    if (poolResult.recordset)
      return res.status(200).json(jsonResult(true, null, poolResult.recordset))
    else if (poolResult.rowsAffected[0] != 0)
      return res.status(201).json(jsonResult(true, null, {}));
    else if (poolResult.rowsAffected[0] === 0)
      return res.status(404).json(jsonResult(true, null, {})); 
    else if (poolResult)
      return res.status(200).json(jsonResult(true, null, poolResult.recordset));
    else if (mensaje && !poolResult)
      return res.status(500).json(jsonResult(false, mensaje, {}));
    else
      return res
        .status(500)
        .json(jsonResult(false, "General system error", {}));
  } catch (e) {
    utils.logErrorToFile(e);
    console.log(e);
    return res.status(500).json(jsonResult(false, "General system error", {}));
  }
};

const jsonResult = (exito, mensaje, data) => {
  try {
     console.log(data)
    // console.log({ success: "true", message: "Operation successful", data: data ? utils.encryptAES(JSON.stringify(data)) : null })
     // utils.logErrorToFile(JSON.stringify(data));
    if (exito === true)
      return {
        success: "true",
        message: "Operation successful",
        data: data && data != {} && data != undefined ? utils.encryptAES(JSON.stringify(data)) : utils.encryptAES(JSON.stringify({})),
      };
    else {
      if (mensaje !== null)
        return { success: "false", message: mensaje, data: data };
      else
        return {
          success: "false",
          message: "General system error",
          data: data,
        };
    }
  } catch (e) {
    utils.logErrorToFile(e);
    console.log(e);
  }
};

module.exports = {
  jsonResult,
  ApiResponse,
};
