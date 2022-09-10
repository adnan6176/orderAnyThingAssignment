const express = require ('express');
const cartRoute = express.Router();


const {addItemInCart,checkout,viewCart} = require('../controllers/cart')

const {addCartItemsFormValidation} = require('../middlewares/formValidation')

const {authenticateToken} = require('../middlewares/user')

cartRoute.post('/',addCartItemsFormValidation,authenticateToken,addItemInCart);
cartRoute.get('/checkout',authenticateToken,checkout);
cartRoute.get('/',authenticateToken,viewCart)

module.exports = {
    cartRoute
}