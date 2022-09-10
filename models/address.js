const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const db = require('../config/database');

const Address = db.define('addresses',{
    id:{
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4
    },
    item:{
        type : DataTypes.UUID,
        allowNull : false
    },
    address :{
        type : DataTypes.STRING,
        allowNull : false
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

// Address.sync().then(() => {
//   console.log('table created');
// }).catch(()=>{"error creating table"});

module.exports = Address;