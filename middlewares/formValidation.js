const Joi = require('joi');
const createError = require('http-errors');



const signUpSchema = Joi.object({
    "phone": Joi.string().required(),
    "password": Joi.string().min(4).required(),
    "role": Joi.string().valid('customer', 'admin', 'deliveryPerson').required()

   
})

const addCatalogueItemsSchema = Joi.object({
    "name": Joi.string().required(),
    "address": Joi.string().min(4).required(),
    "category": Joi.string().valid('medicine','food','cloth').required(),
    "lat" : Joi.number().required(),
    "long" : Joi.number().required()

})


const addCartItemsSchema = Joi.object({
    "itemId": Joi.string().required(),
    "quantity": Joi.number().required()
})


async function signUpFormValidation(req, res, next) {
    try {
        console.log("in joi valFormReg > user > middleware")
        const { 
            phone,
            password,
            role
        } = req.body;
        const result = await signUpSchema .validateAsync(req.body)
            .then(() => {
                req.roleForSignUp = req.body.role;
                next();
            });
    }
    catch (error) {
        if (error.isJoi == true) {
            console.log("joi error");
            console.log(error.message);
            const newError= createError(422,error.message);
            next(newError);
        }
        else {
            next(error);
        }
    }
}


async function addCatalogueFormValidation(req, res, next) {
    try {
        console.log("in joi valFormReg > user > middleware")
        const { 
            name,
            address,
            category,
            lat,
            long
        } = req.body;
        const result = await addCatalogueItemsSchema .validateAsync(req.body)
            .then(() => {
                // req.roleForSignUp = req.body.role;
                next();
            });
    }
    catch (error) {
        if (error.isJoi == true) {
            console.log("joi error");
            console.log(error.message);
            const newError= createError(422,error.message);
            next(newError);
        }
        else {
            next(error);
        }
    }
}

async function addCartItemsFormValidation(req, res, next) {
    try {
        console.log("in joi cartItemsFormValidation")
        const { 
            user_id,
            item,
            quantity
        } = req.body;
        const result = await addCartItemsSchema.validateAsync(req.body)
            .then(() => {
                // req.roleForSignUp = req.body.role;
                next();
            });
    }
    catch (error) {
        if (error.isJoi == true) {
            console.log("joi error");
            console.log(error.message);
            const newError= createError(422,error.message);
            next(newError);
        }
        else {
            next(error);
        }
    }
}



module.exports = {
    signUpFormValidation,
    addCatalogueFormValidation,
    addCartItemsFormValidation
}
