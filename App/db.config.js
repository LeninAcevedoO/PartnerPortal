const sql = require('mssql');

const config = {
  user: 'sqlserver',
  password: '{kSc(&10J7O7p;<l',
  server: '34.67.138.191',
  database: 'pp_db',
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

module.exports = config;
