
const createError = require('http-errors');
const Order = require('../models/order')

const viewOrder = async (req, res, next) => {
    try {
        console.log("called viewOrder");
        if(req.query.orderState){
            const orderState = req.query.orderState.split(',');
            await Order.findAll({
                where: {
                  status: orderState // Same as using `id: { [Op.in]: [1,2,3] }`
                }
              })
                .then((data) => {
                    res.status(200).json({ data });
                })
    
        }
        else{
            await Order.findAll({
      
              })
                .then((data) => {
                    res.status(200).json({ data });
                })
        }

    }
    catch (error) {
        // console.error('Unable to connect to the database:', error);
        next(error);
    }
}


const assignOrder = async(req,res,next)=>{
    try{
        
        // console.log("in assign order controller");
        const {
            orderId,
            personId
        } = req.body;
        

        await Order.update({ status: "ENROUTE", delivert_partner_id :personId }, {
            where: {
                id: orderId
            }
        })
        
        res.status(200).send("success");
        
    }
    catch(error){
        // console.error('Unable to connect to the database:', error);
        next(error);
    }
}

const changeOrderStatus = async(req,res,next)=>{
    try{
        
        // console.log("in change order controller");
        const {
            orderId,
            orderStatus
        } = req.body;
        

        await Order.update({ status: orderStatus }, {
            where: {
                id: orderId
            }
        })
        
        res.status(200).send("success");
        
    }
    catch(error){
        // console.error('Unable to connect to the database:', error);
        next(error);
    }
}
module.exports = {
    viewOrder,
    assignOrder,
    changeOrderStatus
}