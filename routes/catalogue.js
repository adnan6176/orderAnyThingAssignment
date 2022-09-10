const express = require ('express');
const catalogueRoute = express.Router();


const {viewCatalogue,addCatalogueItem} = require('../controllers/catalogue')

const {addCatalogueFormValidation} = require('../middlewares/formValidation')



catalogueRoute.get('/',viewCatalogue);
catalogueRoute.post('/addItem', addCatalogueFormValidation,addCatalogueItem)

module.exports = {
    catalogueRoute
}