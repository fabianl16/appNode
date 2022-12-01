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
// dbConn.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected!");
// });




function handleDisconnect() {
  // connection = mysql.createConnection(); // Recreate the connection, since
                                                  // the old one cannot be reused.
    dbConn.connect(function(err) {                // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }     
    console.log("Database Connected!");                                // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
    dbConn.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
module.exports = dbConn;