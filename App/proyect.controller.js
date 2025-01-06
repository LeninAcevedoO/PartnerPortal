const { ApiResponse } = require("./interfaces.model.js");
const { BigQuery } = require('@google-cloud/bigquery');

//#region General

const ConnectionTest = (req, res) => {
    return res.json({ success: "true", message: "Successfull connection", data: {} });
}

const login = async (req, res) => {
    try {
        const bigquery = new BigQuery();
        const query = `SELECT * FROM WREdemo.ods_login WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
        const options = {
            query: query,
            location: 'US',
        };
        const [job] = await bigquery.createQueryJob(options);
        const [rows] = await job.getQueryResults();
        if (rows.length <= 0)
            return res.status(401).json({ Exito: "false", mensaje: "Invalid email/password", Data: {} })
        else
            return ApiResponse(rows, res)
    } catch (e) {
        console.log(e)
        return ApiResponse(null, res, 'Error al obtener el dashboard')
    }
}

//#endregion

module.exports = {
    ConnectionTest, login,
}