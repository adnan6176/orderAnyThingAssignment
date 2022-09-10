
console.log('OrderAnything Application....\n');
const express = require('express');
const createError = require('http-errors');
require('dotenv').config();


const { demoRoute } = require('./routes/demo');
const { signUpRoute } = require('./routes/signup');
const { catalogueRoute } = require('./routes/catalogue');
const {cartRoute} = require('./routes/cart');
const {orderRoute} = require('./routes/order');
const {driverRoute} = require('./routes/driver')



const User = require('./models/user')
const db = require('./config/database');



// process.env.ACCESS_TOKEN_SECRET;




const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use('/demo', demoRoute);
app.use('/user',signUpRoute);
app.use('/catalogue',catalogueRoute);
app.use('/cart',cartRoute)
app.use('/order',orderRoute)
app.use('/delivery',driverRoute)



// handle all resource
app.use(async (req, res, next) => {
    console.log(`in all route >> route ${req.url} not handled`)
    // const error = new Error("Page Not Found");
    const error= createError(404,"Resource not found");
    error.status = 404;
    next(error);
})


// error handler

app.use((err, req, res, next) => {
    console.log("error handled by error handler");
    if (createError.isHttpError(err)) {
        return res.status(err.status).send({ "error": { "status": err.status, "message": err.message } });
    }
    else {
        console.log(err);
        return res.status(500).send({ "error": { "status": 500, "message": err.message } });
    }
})


///
const myPort = process.env.PORT;
app.listen(myPort, () => {
    console.log(`Server is listening on port ${myPort}...`);

})