
const createError = require('http-errors');
function demoMiddleware(req,res,next){
    console.log("demo function in middleware");
    next();
}

module.exports = {
    demoMiddleware,
}