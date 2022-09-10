
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const UserType = require('../models/usertype')
const Session = require('../models/session')
const Catalogue = require('../models/catalogue')
const Cart = require('../models/cart')
const Order = require('../models/order')
const Address = require('../models/address');
const LineItem = require('../models/lineItem');


const viewCart = async (req, res, next) => {
    try {

        console.log("IN VIEW CART");

        await Cart.findAll({
            where: { user_id: req.userId, active: 'true' }, raw: true
        })
            .then((data) => {
                res.status(200).json({ data });
            })
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        next(error);
    }
}


const addItemInCart = async (req, res, next) => {
    try {

        console.log("adding item to cart Controller");
        console.log(req.role);
        console.log(req.userId);

        // const {
        //     item,
        //     quantity
        // } = req.body;
        const item = req.body.itemId;
        const quantity = req.body.quantity;
        var parsedQuantity = parseInt(quantity);
        // check if product id is valid or not
        var productIsValid = false;
        await Catalogue.findAll({ where: { id: item }, raw: true })
            .then((data) => {
                // console.log("count of data" , data.length)
                if (data.length) {
                    console.log("product is present in catalogue");
                    productIsValid = true;
                }
                else {
                    console.log("product is not present");
                    const newError = createError(400, "product not found");
                    throw newError;
                }

            })
        //
        // check if the product is already available in the cart
        var itemIsAlreadyInCart = false;
        await Cart.update({ quantity: parsedQuantity }, {
            where: {
                user_id: req.userId, item: item, active: 'true'
            }
        }).then((data) => {
            if (data[0]) {
                console.log("product is already in cart, quantity is updated");
                console.log("number of updated rows is", data[0]);
                console.log(data);
                itemIsAlreadyInCart = true;
            }
            else {
                console.log("the product is not present in cart");
            }

        })

        if (!itemIsAlreadyInCart) {
            await Cart.create({ user_id: req.userId, item: item, quantity: parsedQuantity })
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
        return res.status(200).json({ "message": "adding item to cart" });

    }
    catch (error) {
        // console.error('Unable to connect to the database:');
        next(error);
    }
}

const checkout = async (req, res, next) => {
    try {

        console.log(req.userId, req.role, req.sessionId);

        var orderId = '';
        await Order.create({ customer_id: req.userId })
            .then((data) => {
                console.log('partially order created....');
                orderId = data.toJSON().id;
                console.log(data.toJSON());
            })
            .catch((error) => {
                console.log(error.message);
                console.log('data not updated');
            });

        // finding all the items in the cart to add in the order
        var itemInCart = [];
        await Cart.findAll({
            where: { user_id: req.userId, active: 'true' }, raw: true
            , attributes: ['item', 'quantity']

        })
            .then((data) => {
                // console.log("count of data" , data.length)
                if (data.length) {
                    console.log("product is present in catalogue");
                    productIsValid = true;
                    itemInCart = data;
                }
                else {
                    console.log("product is not present");
                    const newError = createError(400, "emptyCart");
                    throw newError;
                }
            })

        console.log(itemInCart);



        for (i = 0; i < itemInCart.length; i++) {
            console.log(i);
            myValue = await selectAddress(itemInCart[i].item);
            itemInCart[i].order = orderId;
            itemInCart[i].address = myValue.address;
            itemInCart[i].long = myValue.long;
            itemInCart[i].lat = myValue.lat;
            console.log(myValue);
        }


        const lineItems = await LineItem.bulkCreate(itemInCart);



        await Cart.update({ active: false }, {
            where: {
                user_id: req.userId, active: 'true'
            }
        })

        res.status(200).json({ "success": itemInCart });

    }
    catch (error) {
        next(error);
    }
}


async function selectAddress(productId) {
    try {
        console.log('inside seleddddct function');
        productId = '3d84dbd7-021c-43f1-a03a-8640dea75f5c'
        var myData = 'default';
        await Address.findAll({ where: { item: productId }, raw: true, attributes: ['address', 'lat', 'long'] })
            .then((data) => {
                if (data) {
                    console.log("data found");
                    console.log(data);
                    randomIndex = Math.floor(Math.random() * data.length)
                    myData = data[randomIndex];
                }
                else {
                    myData = null;
                }

            })
            .catch((error) => {

                console.log("error found");
            });

        console.log("2 .i am after helper");
        return myData;

    }
    catch {

    }
}

module.exports = {
    addItemInCart,
    checkout,
    viewCart
}
