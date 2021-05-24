const express = require('express');
var router = express.Router();

const user = require('../controllers/user');
const question = require('../controllers/Employee');
router.post('/signup', user.signup);
router.post('/login', user.login);
router.get('/getuserdata', user.getuserdata);
router.post('/insertemployee',question.insertquestion);
router.post('/updateemployee',question.updateditem);
router.post('/deleteuser',question.deleteUser)
router.post('/forgot',user.forgotPassword)

module.exports = router
