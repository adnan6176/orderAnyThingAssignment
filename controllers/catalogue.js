
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const UserType = require('../models/usertype')
const Session = require('../models/session');
const Catalogue = require('../models/catalogue');
const Address = require('../models/address');

const viewCatalogue = async(req,res,next)=>{
    try{
        console.log("viewCatalogue Controller");

        await Catalogue.findAll({raw : true})
        .then((data) => {
            if(data){
                console.log("viweing all catalogue.......");
                console.log(data);
                res.status(200).json({ data });
                
            }
            else{
                next(error);
            }
            
        })
        .catch((error) => {
            next(error);
        });


  
    }
    catch(error){
        console.error('Unable to connect to the database:', error);
        next(error);
    }
}



const addCatalogueItem = async(req,res,next)=>{
    try{
        console.log("-----addCatalogueItem Controller");

        const {
            name,
            category,
            address,
            lat,
            long
        } = req.body
        var productId = '';
        var productIsRegistered = false;

        await Catalogue.findAll({where : {name : req.body.name} , raw:true})
        .then((data) => {
            console.log("count of data" , data.length)
            if(data.length){
                console.log("product is present");
                productId = data[0].id;
                productIsRegistered = true;
            }
            else{
                console.log("product is not present");
            }
            
        })
        .catch((error) => {
            console.log(error.message);
            console.log('data not found');
        });

        
        if(!productIsRegistered){
            console.log("product is not registered");
            await Catalogue.create({ name:name,category: category })
            .then((data) => {
                console.log('datainserted');
                productId = data.toJSON().id;
                console.log(data.toJSON());
            })
            .catch((error) => {
                console.log(error.message);
                console.log('data not updated');
            });
        }

        console.log("checking address");
        
        addressAlreadyRegistered = false;
        await Address.findAll({where : {item :productId,address:address,lat:lat, long:long} , raw:true})
        .then((data) => {
            console.log("count of data" , data.length)
            if(data.length){
                console.log("address is already registered");
                addressAlreadyRegistered  = true;
            }
            else{
                console.log("product is not present");
            }
            
        })
        .catch((error) => {
            console.log(error.message);
            console.log('data not found');
        });


        if(!addressAlreadyRegistered ){
            console.log("address is not registered");
            await Address.create({item :productId,address:address,lat:lat, long:long})
            .then((data) => {
                console.log('datainserted');
                productId = data.toJSON().id;
                console.log(data.toJSON());
            })
            .catch((error) => {
                console.log(error.message);
                console.log('data not updated');
            });
        }




        console.log(req.body);
        await Catalogue.findAll({raw : true})
        .then((data) => {
            if(data){
                console.log("viweing all catalogue.......");
                console.log(data);

                return res.status(200).json({ data });
                
            }
            else{
                next(error);
            }
            
        })
        .catch((error) => {
            next(error);
        });


  
    }
    catch(error){
        console.error('Unable to connect to the database:', error);
        next(error);
    }
}



module.exports = {
    viewCatalogue,
    addCatalogueItem
}