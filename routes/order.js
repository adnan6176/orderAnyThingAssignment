const express = require ('express');
const orderRoute = express.Router();


// const {demoController} = require('../controllers/demo');
const { viewOrder,assignOrder,changeOrderStatus } = require('../controllers/order');
const {authenticateToken} = require('../middlewares/user')
const {demoMiddleware} = require('../middlewares/demo')



orderRoute.get('/',authenticateToken,viewOrder);
orderRoute.post('/assign',authenticateToken,assignOrder);
orderRoute.put('/changeStatus',authenticateToken,changeOrderStatus);

module.exports = {
    orderRoute
}