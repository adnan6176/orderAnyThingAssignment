const jwt = require('jsonwebtoken')
const createError = require('http-errors');
const bcrypt = require('bcrypt')
require('dotenv').config();
const User = require('../models/user');
const UserType = require('../models/usertype');
const Session = require('../models/session');


async function userExists(req,res,next){

    try{
        console.log('.. in user Exist  middleware')
        const { 
            phone,
            password,
            role
        } = req.body;
        var user_id = "";
        // const project = await Project.findOne({ where: { title: 'My Title' } });
        await User.findOne({where : {phone : phone} })
        .then((data) => {
            console.log('................data is found...............');
            // user_id = data.toJSON().user_id;
            // console.log(data.toJSON());
            user_id = data.toJSON().user_id;
            console.log("user id is ", user_id);
        })
        .catch((error) => {
            console.log(error.message);
            console.log('data not found');
        });

        console.log('###############')
        console.log(user_id);
        console.log(req.body.role);
        console.log('################')
        await UserType.findOne({where : {user_id : user_id, type: req.body.role}})
        .then((data) => {
            
            console.log(req.body.role);
            
            if(data) {
                const message = 'already registered as ' + req.body.role;
                const error = createError(404,message)
                next(error);
            }
            req.user_id = user_id;
            
        })
        .catch((error) => {
            console.log(error.message);
            console.log('data not found');
        });
        

        next();

    }
    catch(error){
        next(error)
    }
}

const checkLogin = async (req, res, next) => {
    try {
        console.log("in login user");

        const { phone, password, role } = req.body;
        
        var regPassword = '';
        var regUserId = '';

        await User.findOne({where : {phone : phone} })
        .then((data) => {
            if(data){
                regPassword = data.toJSON().password;
                regUserId = data.toJSON().user_id;
                console.log("user is available")
                // userInfo = data.toJSON().user_id;
                // console.log("user passs ", userInfo);
            }
            else{
                const error = createError('400','invalid user');
                next(error);
            }
            
        })
        .catch((error) => {
            console.log(error.message);
            console.log('data not found');
        });


        await UserType.findOne({where : {user_id : regUserId, type : req.body.role} })
        .then((data) => {
            if(data){
                console.log("user is available with role");
            }
            else{
                const error = createError('400','user and role does not exit');
                next(error);
            }
            
        })
        .catch((error) => {
            console.log(error.message);
            console.log('data not found');
        });

        

        console.log("password" , password);
        console.log("regpassword",regPassword);
        const valid = await bcrypt.compare(password, regPassword);
        if(valid){
            console.log("passed to next middleware");
            // return res.status(200).json({ "success": "success fully login" });
            req.userId = regUserId;
            next();
        }
        else{
            console.log("error in bcrypt");
            throw createError(401,'invalid username or password');
        }
        
    }
    catch (error) {
        next(error);
    }
}

async function authenticateToken(req,res,next){
    try{
        console.log('in auth middleware')
        const authHeader = req.headers['authorization']
        const token =authHeader && authHeader.split(' ')[1];
        if(token == null) {
            const error = createError(403,"token missing");
            next(error);
            return;
        }
    
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        
        const verified = jwt.verify(token , accessTokenSecret,(err,user)=>{
            if(err) {
                console.log(err);
                return false;
            }

            req.role = user.role;  
            req.sessionId = user.sessionId;
            req.userId = user.userId;
            return true;
        })
        console.log(verified);
    
        if(!verified){
            const error = new Error("uauthorized access");
            error.status=401;
            next(error);
            return;
        }


        await Session.findOne({where : {session_id : req.sessionId, isActive : "true"} })
        .then((data) => {
            if(data){
                console.log("session id active");
            }
            else{
                const error = createError('400','session expired');
                next(error);
            }
            
        })
        .catch((error) => {
            console.log(error.message);
            console.log('data not found');
        });


        console.log("token is verified");
        next();
    
        

        
    }

    catch(error){
        next(error);
    }


}


module.exports = {
    userExists,
    checkLogin,
    authenticateToken
}