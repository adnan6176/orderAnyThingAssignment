
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const UserType = require('../models/usertype')
const Session = require('../models/session')

const signUp = async (req, res, next) => {
    try {
        console.log("in user sign up");

        const { phone, password, role } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(phone, hashedPassword, role);
         

        if(!req.user_id){
            console.log("user does not exist with given role");
            console.log(";;;;;;;;;;");
            console.log(req.user_id);
            await User.create({ phone: phone, password: hashedPassword })
            .then((data) => {
                console.log('datainserted');
                req.user_id = data.toJSON().user_id;
                console.log(data.toJSON());
            })
            .catch((error) => {
                console.log(error.message);
                console.log('data not updated');
            });
            console.log("before ........................user");

        }

        // console.log(user_id);

        await UserType.create({ user_id: req.user_id, type: req.body.role })
            .then((data) => {
                console.log('role created');
                // user_id = data.toJSON().user_id;
                console.log(data.toJSON());
            })
            .catch((error) => {
                console.log(error.message);
                console.log('data not updated');
            });
        console.log("before ........................role creation");

        return res.status(200).json({ "success": "in user sign up route" });
    }
    catch (error) {
        next(error);
    }
}


const login = async (req, res, next) => {
    try {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        console.log("successfull login");
        const { phone, password, role } = req.body;
        
        console.log(req.userId);

        

        // const info = {"userId" : req.userId, "sessionId" : result.rows[0].id , "role" : role}
        // const  accessToken  = jwt.sign(info,accessTokenSecret) 
        

        await Session.create({ user_id: req.userId, type: req.body.role })
        .then((data) => {
            console.log('session created');
            const info = {"userId" : req.userId, "sessionId" : data.toJSON().session_id , "role" : role}
            const  accessToken  = jwt.sign(info,accessTokenSecret) ;
            console.log(data.toJSON().session_id);
            return res.status(200).json({ "jwt": accessToken });
        })
        .catch((error) => {
            console.log(error.message);
            console.log('data not updated');
        });

       

     
        
    }
    catch (error) {
        next(error);
    }
}

const view = async (req, res, next) => {
    try {
        
        console.log(req.userId, req.role, req.sessionId);
        res.status(200).json({ "success": "view order" });
        
        
    }
    catch (error) {
        next(error);
    }
}



module.exports = {
    signUp,
    login,
    view
}
