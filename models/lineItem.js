const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const db = require('../config/database');

const LineItem = db.define('line_items',{
    id:{
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4
    },
    order:{
        type : DataTypes.UUID,
        allowNull : false
    },
    item : {
        type : DataTypes.UUID,
        allowNull : false
    },
    quantity :{
        type : DataTypes.INTEGER,
        allowNull : false,
        defaultValue : 0,
    },
    address : {
        type : DataTypes.STRING,
        allowNull : true
    },
    lat:{
        type : DataTypes.FLOAT,
        allowNull : false
    },
    long:{
        type : DataTypes.FLOAT,
        allowNull : false
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

module.exports = LineItem;