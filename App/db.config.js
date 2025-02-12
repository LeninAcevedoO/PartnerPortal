require('dotenv').config();

// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER,
//   database: process.env.DB_NAME,
//   options: {
//     encrypt: true,
//     trustServerCertificate: true
//   },
// };

const config = `Data Source=${process.env.DB_SERVER};Initial Catalog=${process.env.DB_NAME};User ID=${process.env.DB_USER};Password=${process.env.DB_PASSWORD};TrustServerCertificate=True;`;

module.exports = config;
