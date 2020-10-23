const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection-database')
const bcrypt = require('bcryptjs')
const Address = require('../models/Address')

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    telephone: {
        type: DataTypes.INTEGER
    }
}, { 
    sequelize, 
    timestamps: true,
    modelName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            
            const hash = await bcrypt.hash(user.password, 10)

            user.password = hash
        }
    } 
})

const Relation = Users.belongsTo(Address, { foreignKey: 'addressId', onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true })

module.exports = { Users, Relation }