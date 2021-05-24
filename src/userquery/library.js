require('dotenv').config();
var knex = require('../config/knex');

//insert the data common function

let insertorupdate = (tableName, data) => {
    return new Promise((resolve, reject) => {
        let response = tableName.query().insert(data);
        //console.log('the response object is the',response)
        response.then(result => {
            resolve(result)
        }).catch(error => {
            reject(error)
        })
    })
}

let simpleselect = (Model, column, where) => {
    return new Promise((resolve, reject) => {
        console.log("enters in simpleselect");
        let mod = knex.select(column).from(Model.tableName);
        console.log(where, "where condition issssssssssssssss");
        if (where) {
            mod = mod.whereRaw(where)
        }
        console.log(mod.toQuery(), "query isssssssssssssssssssss");
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error)
        })
    })
}

// update data with where condition query bulid method
let updatecoloum = function (tableName, wherecondition, updatecoloums) {
    console.log('sdknskdn')
    return new Promise((resolve, reject) => {
        let update = knex(tableName).where(wherecondition).update(updatecoloums)
        console.log(update.toQuery());
        update.then(result => {
            resolve(result);
        }).catch(error => {
            console.log('erer',error)
            reject(error);
        })
    })
}

//delete the records
let deleteTable = function (tableName, columnName, columnValue) {
    return new Promise((resolve, reject) => {
        let mod = knex(tableName).where(columnName, columnValue).del();
        mod.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

// update data with where condition query bulid method
const updateWithWhere = (request, Model, data, condition) => {
    return new Promise(async(resolve, reject) => {
        let query = Knexx.knex(Model.tableName).whereRaw(condition).update(data);
        console.log("Final updateWithWhere query isss ===>", query.toQuery());
        query.then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

module.exports = {
    insertorupdate,
    simpleselect,
    updatecoloum,
    deleteTable,
    updateWithWhere
}