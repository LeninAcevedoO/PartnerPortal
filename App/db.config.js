const sql = require('mssql');

const config = {
  user: 'sqlserver',
  password: 'PH,ZU&&L{5n.S/89',
  server: '34.59.217.201',
  database: 'doc_db',
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

module.exports = config;
