const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection-database')

class Address extends Model {}

Address.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    street: {
        type: DataTypes.STRING
    },
    number: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'address'
})

module.exports = Address