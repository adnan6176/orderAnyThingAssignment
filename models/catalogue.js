const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const db = require('../config/database');

const Catalogue = db.define('catalogue',{
    id:{
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4
    },
    name:{
        type : DataTypes.STRING,
        allowNull : false,
        unique: true
    },
    category:{
        type : DataTypes.ENUM("medicine","food","cloth"),
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

module.exports = Catalogue;