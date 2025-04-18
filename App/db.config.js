require('dotenv').config();

const config = `Data Source=${process.env.DB_SERVER};Initial Catalog=${process.env.DB_NAME};User ID=${process.env.DB_USER};Password=${process.env.DB_PASSWORD};TrustServerCertificate=True;`;

module.exports = config;
