const express = require ('express');
const demoRoute = express.Router();


const {demoController} = require('../controllers/demo')

const {demoMiddleware} = require('../middlewares/demo')



demoRoute.get('/',demoMiddleware,demoController);

module.exports = {
    demoRoute
}