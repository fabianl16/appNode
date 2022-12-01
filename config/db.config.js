'use strict';
const mysql = require('mysql');
require('dotenv').config();
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USERNAME,
  port     : 3306,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;