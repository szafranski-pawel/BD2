const Pool = require("pg").Pool;
const connectionString = 'postgres://euodhzgk:3MjICPsnmRRdaNLycPLyznfdGbjce6Wy@tai.db.elephantsql.com/euodhzgk'

const pool = new Pool ({
    connectionString,
});

module.exports = pool;
