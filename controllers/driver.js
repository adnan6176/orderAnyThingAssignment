const db = require('../config/database');
const createError = require('http-errors');

const viewDriver = async(req,res,next)=>{
    try{
        console.log('in driver')

        // deliveryPerson
        const [results, metadata] = await db.query(
            `SELECT users.user_id, phone, type as role FROM users JOIN user_types ON users.user_id = user_types.user_id
            WHERE user_types.type='deliveryPerson'`
          );

          console.log("printing results");
          console.log(results);
           
        //   console.log("printing metadata");
        //   console.log(metadata);
          
          


        res.status(200).json({results});
  
    }
    catch(error){
        console.error('Unable to connect to the database:', error);
        next(error);
    }
}

module.exports = {
    viewDriver
}