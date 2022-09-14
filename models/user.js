const { UUIDV4 } = require('sequelize');
const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const db = require('../config/database');

const User = db.define('users',{
    user_id:{
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4
    },
    phone: {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true
    },
    password:{
        type : DataTypes.STRING,
        allowNull : false
    }

},

{
    freezeTableName : true,
    timestamps : false

}
);


module.exports = User;