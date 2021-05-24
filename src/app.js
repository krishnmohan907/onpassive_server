const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors');
const config = require('./config/config');
const router = require('./routers/router')
var app = express();
var http = require('http').createServer(app)
const knex=require('./config/knex')
const { Model }= require('objection')
Model.knex(knex)
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/javascript");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});


app.use('/api', router)

http.listen(config.server.port, (req, res) => {
    if (config.server.host != 'localhost' && config.server.host != '0.0.0.0') {
        console.log('data base connection is sucessfully completed')
    } else {
        config.server.host = 'localhost';
        console.log(`express server listening on http://${config.server.host}:${config.server.port}`)
    }
});

module.exports = app;