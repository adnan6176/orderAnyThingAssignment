const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const db = require('../config/database');

const UserType = db.define('user_types',{
    id:{
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4
    },
    user_id:{
        type : DataTypes.UUID,
        allowNull : false
    },
    type:{
        type : DataTypes.ENUM("admin","customer","deliveryPerson"),
        allowNull : false
    }

},

{
    freezeTableName : true,
    timestamps : false

}
);



module.exports = UserType;