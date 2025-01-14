const ApiResponse = (poolResult, res, mensaje) => {
    try {
        if (poolResult)
            return res.status(200).json(jsonResult(true, null, poolResult.recordset))
        else if (poolResult.rowsAffected[0] > 0)
            return res.status(201).json(jsonResult(true, null, {}))
        else if (poolResult.rowsAffected[0] === 0)
            return res.status(404).json(jsonResult(true, null, null))
        else if (mensaje && !poolResult)
            return res.status(500).json(jsonResult(false, mensaje, {}))
        else
            return res.status(500).json(jsonResult(false, "General system error", {}))
    } catch (e) {
        return res.status(500).json(jsonResult(false, "General system error", {}))
    }
}

const jsonResult = (exito, mensaje, data) => {
    if (exito === true)
        return { success: "true", message: "Operation successful", data: data ? data : null }
    else {
        if (mensaje !== null)
            return { success: "false", message: mensaje, data: data }
        else
            return { success: "false", message: "General system error", data: data }
    }
}

module.exports = {
    jsonResult, ApiResponse
}