const joi = require('joi')
const library = require('../userquery/library');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const user =require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

//Sign up for User Details
module.exports.signup = async (request, response) => {
    console.log('pay load value', request.body)  
    const scheme = joi.object({
        email: joi.string().required(),
        password: Joi.string().required(),
    });
    const validation = scheme.validate(request.body);
    const data = {
        email: request.body.email,
        password: request.body.password,
    }
    console.log('user data', data);
    try {
        await library.insertorupdate(user, data).then(result => {
            let data1 = {
                message: 'success',
                status: 200,
                data: result
            }
            response.status(200).json(data1)
        }).catch(err => {
            console.log('error', err)
            let data2 = {
                message: 'error',
                status: 404,
                data: err
            }
            response.status(200).json(data2)
        })
    }
    catch (err) {
        throw err;
    }
}

//Login for User ApI
module.exports.login = async (request, response) => {
    console.log('the request object', request.body);
    let email = request.body.email;
    let password = request.body.pswd;
    console.log('the request object', email, password);
    if (!email || !password) {
        return response.status(200).json({
            success: false,
            statusCode: 204,
            message: 'Required feilds are empaty please check once',
            data: null
        });
    }
    let where = `email='${email}' AND password='${password}'`
    console.log('the where condition login application', where);
    await library.simpleselect(user, '*', where).then(result => {
        console.log(result, "resposne issssssssssss");
        if (result == '' || result == null || result == []) {
            return response.status(200).json({
                success: false,
                statusCode: 404,
                message: 'Invalid username or password',
                data: null
            })
        }
        var token = jwt.sign({
            email: result[0].email,
            password: result[0].password
        }, 'worldisfullofdevelopers', {
            algorithm: 'HS256',
            expiresIn: '1h'
        })
        return response.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Login success',
            data: result,
            token: token
        })
    }).catch(error => {
        console.log('error', error)
        response.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while login',
            data: error
        })
    })
}

// forgot password and reset

// user forgot password and reset password API
module.exports.forgotPassword = async (request, response) => {

    console.log("request body isss", request.body);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const findUser = await library.simpleselect(user, '*', `email='${request.body.email}'`);

    console.log("Get response of update password", findUser);

    if (!findUser || findUser.length == 0) {
        console.log('Invalid email or email is not registered', findUser);
        return response.status(200).json({
            success: false,
            error: true,
            message: 'Invalid email or email is not registered',
            data: null
        });
    }

    const updatePassword = cryptoRandomString({
        length: 10,
        type: 'alphanumeric'
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: `${request.body.email}`,
        subject: 'Reset password request mail',
        // text: `Hi ${findUser[0].name}, I think you might forgot your password. No problem, Please login with new Password :: ${updatePassword}`,
        html: `<p>Hi ${findUser[0].name}, I think you might forgot your password. No problem, Please login with new Password :: ${updatePassword}</p>`
    }

    try {
        await transporter.sendMail(mailOptions, async function (err) {
            if (err) {
                console.log('Error while sent mail', err);
                return response.status(200).json({
                    success: false,
                    error: true,
                    message: 'Error while sent mail',
                    data: null
                });
            } else {
                // user password encryption process
                const saltRounds = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(updatePassword, saltRounds);
                const encrytPassword = await library.encrypt(hashPassword, process.env.SECURITY_KEY);

                await library.updateWithWhere(request, Users, {
                    password: encrytPassword
                }, `email = '${request.body.email}'`).then(async result => {
                    console.log('New password sent to email successful', result);
                    return response.status(200).json({
                        success: true,
                        error: false,
                        message: 'New password sent to email successful',
                        data: result
                    });
                }).catch(err1 => {
                    console.log("Failed to update new password", err1);
                    return response.status(200).json({
                        success: false,
                        error: true,
                        message: 'Failed to update new password',
                        data: null
                    });
                });
            }
        });
    } catch (error) {
        console.log("Error at Try Catch API", error);
        return response.status(200).json({
            success: false,
            error: true,
            message: 'Error while sent mail',
            data: null
        });
    }
}



//Get employee ApI
module.exports.getuserdata = async (request,response) =>{
    await Employee.query().select().alias('user')
    .then(result =>{
        return response.status(200)
        .json({
            success:true,
            message:'fetch the data from Employee',
            status:200,
            data:result
        })
    }).catch(error =>{
        console.log('error is the',error)
        return response.status(200)
        .json({
            success:false,
            message:'unable to fetch the data',
            status:400,
            data:error
        })
    })
 }
