const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const db = require('../config/database');

const Order = db.define('orders',{
    id:{
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4
    },
    customer_id:{
        type : DataTypes.UUID,
        allowNull : false
    },
    delivert_partner_id : {
        type : DataTypes.UUID,
        allowNull : true
    },
    status:{
        type : DataTypes.ENUM("TASK_CREATED","REACHED_STORE","ITEMS_PICKED","ENROUTE","DELIVERED","CANCELED"),
        allowNull : false,
        defaultValue : "TASK_CREATED"
    }
},

{
    freezeTableName : true,
    timestamps : false

}
);

// UserType.sync().then(() => {
//   console.log('table created');
// }).catch(()=>{"error creating table"});

module.exports = Order;