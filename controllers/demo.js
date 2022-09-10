
const createError = require('http-errors');




const demoController = async(req,res,next)=>{
    try{
        console.log("called demoController");

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

  
    }
    catch(error){
        console.error('Unable to connect to the database:', error);
        next(error);
    }
}

module.exports = {
    demoController
}