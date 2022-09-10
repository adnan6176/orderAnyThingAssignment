const express = require ('express');
const driverRoute = express.Router();

const {viewDriver} = require('../controllers/driver')
const {authenticateToken} = require('../middlewares/user')

driverRoute.get('/',authenticateToken,viewDriver);

module.exports = {
    driverRoute
}