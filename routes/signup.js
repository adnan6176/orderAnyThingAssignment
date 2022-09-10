const { application } = require('express');
const express = require ('express');
const signUpRoute = express.Router();



const {signUp,login,view} = require('../controllers/user')

const {signUpFormValidation} = require('../middlewares/formValidation')

const {userExists,checkLogin,authenticateToken} = require('../middlewares/user')

signUpRoute.post('/signUp' , signUpFormValidation,userExists,signUp);
signUpRoute.post('/login',signUpFormValidation,checkLogin,login);
signUpRoute.get('/view',authenticateToken,view);

// demoRoute.get('/',demoMiddleware,demoController);

module.exports = {
    signUpRoute
}