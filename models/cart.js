const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const db = require('../config/database');

const Cart = db.define('cart',{
    id:{
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4
    },
    user_id:{
        type : DataTypes.UUID,
        allowNull : false
    },
    item:{
        type : DataTypes.UUID,
        allowNull : false
    },
    quantity :{
        type : DataTypes.INTEGER,
        allowNull : false,
        defaultValue : 0,
    },
    active : {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }


},

{
    freezeTableName : true,
    timestamps : false

}
);



module.exports = Cart;