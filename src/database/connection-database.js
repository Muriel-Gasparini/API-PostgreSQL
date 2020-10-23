const { Sequelize } = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize('test', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate()
    .then(() => { console.log('Connected to Postgres') })
    .catch(() => { console.log('Fail connection Postgres') })


module.exports = sequelize