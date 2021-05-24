const config = require('../config/config')
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    database: config.database.DB_NAME,
    password: config.database.DB_PASSWORD
})

// const connection = mysql.createConnection({
//     host: config.database.host,
//     user: config.database.dbuser,
//     password: config.database.dbpass,
//     database: config.database.dbname
// });

connection.connect((err, result) => {
    if (err) {
        console.log('Data base connection  is failed')
    }else{
        console.log('data base connection is created')
    }
})