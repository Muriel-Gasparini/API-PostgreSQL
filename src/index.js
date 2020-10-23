const express = require('express')
const app = express()
const helmet = require('helmet')

const config = require('./config/config')

require('./database/connection-database')

app.use(helmet())

app.use(express.json())

app.use('/user', require('./routes/user-route'))

app.listen(config.serverPort, console.log('Server On'))