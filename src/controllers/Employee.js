const library = require('../userquery/library');
const { Validator } = require("objection");
const Employee = require('../models/Employee')
const Joi = require('joi');

// Employee Insert Job Details
module.exports.insertquestion = async (request, response) => {
    console.log('the request pay load value', request.body);
    let lastinsertid = ''
    let validate = false;
    console.log('pay load value', request.body) //request.body = JSON.parse(request.body);
    const scheme = Joi.object({
        Full_name: Joi.string().required(),
        job_Title: Joi.string().required(),
        Departement: Joi.string().required(),
        Location: Joi.string().required(),
        Age: Joi.number().required(),
        Salary: Joi.number().required()
    });
    const validation = scheme.validate(request.body);
    const data = {
        Full_name: request.body.Full_name,
        job_Title: request.body.job_Title,
        Departement: request.body.Departement,
        Location: request.body.Location,
        Age: request.body.Age,
        Salary: request.body.Salary
    }
    try {
        await library.insertorupdate(Employee, data).then(async result => {
            lastinsertid = result.id
            let data2 = {
                message: 'success',
                status: 200,
                data2: result
            }
            response.status(200).json(data2)
        }).catch(err => {
            console.log('error', err)
            let data3 = {
                message: 'error',
                status: 404,
                data3: err
            }
            response.status(200).json(data3)
        })
    } catch (err) {
        throw err;
    }
}

//Updated Employee Details
module.exports.updateditem = async (request, response) => {
    console.log('pay load value', request.body)
    const scheme = Joi.object({
        Emp_id :Joi.number().required(),
        Full_name: Joi.string().required(),
        job_Title: Joi.string().required(),
        Departement: Joi.string().required(),
        Location: Joi.string().required(),
        Age: Joi.number().required(),
        Salary: Joi.number().required()
    });

    const validation = scheme.validate(request.body);
    const data = {
        Emp_id: request.body.Emp_id,
        Full_name: request.body.Full_name,
        job_Title: request.body.job_Title,
        Departement: request.body.Departement,
        Location: request.body.Location,
        Age: request.body.Age,
        Salary: request.body.Salary,
    }
    console.log('data', data);
    try {
        await library.updatecoloum(Employee.tableName, {
            	Emp_id : request.body.Emp_id 
        }, data).then(async result => {
            let data2 = {
                message: 'success',
                status: 200,
                data2: result
            }
            response.status(200).json(data2)
        }).catch(err => {
            console.log('error', err)
            let data3 = {
                message: 'error',
                status: 404,
                data3: err
            }
            response.status(200).json(data3)
        })
    }
    catch (err) {
        console.log('errererr')
        throw err;
    }
}

// Delete Employee Details
module.exports.deleteUser = (req, res, next) => {
    library.deleteTable(Employee.tableName, 'Emp_id', req.body.Emp_id).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'success',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}