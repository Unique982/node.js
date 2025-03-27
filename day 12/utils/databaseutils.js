const mysql = require('mysql2');
const pool = mysql.createPool({
 host :"localhost",
 user :"root",
 password :"root",
 database :"aribrib"
});
module.exports = pool.promise();