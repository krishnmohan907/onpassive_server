require('dotenv').config()

module.exports = {
    server: {
        host: process.env.HOST,
        port: process.env.PORT
    },
    database: {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        DB_PASSWORD:process.env.DB_PASSWORD,
        db:process.env.DB_NAME
    }   
}