const { UUIDV4 } = require('sequelize');
const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const db = require('../config/database');

const Session = db.define('sessions',{
    session_id:{
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4,

    },
    user_id : {
        type : DataTypes.UUID,
        allowNull : false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
},

{
    freezeTableName : true,
    timestamps : false

}
);

module.exports = Session;