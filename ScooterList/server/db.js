/*const Pool = require("pg").Pool;
const connectionString = 'postgres://euodhzgk:3MjICPsnmRRdaNLycPLyznfdGbjce6Wy@tai.db.elephantsql.com/euodhzgk'

const pool = new Pool ({
    connectionString,
});

module.exports = pool;*/

const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "postgres"
});

module.exports = pool;
