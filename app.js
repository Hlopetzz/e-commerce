'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// app.set('port', (process.env.PORT || 3000))
const PORT = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engin', 'ejs')
const morgan = require('morgan')
app.use(morgan('dev'))
const winston = require('winston')

let logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            colorize: true
        }),
        new winston.transports.File({
            filename: 'errors.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss A ZZ'
                }),
                winston.format.json()
            ),
            handleExceptions: true
        }),
        new winston.transports.File({
            name: 'server',
            filename: 'server.log',
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss A ZZ'
                }),
                winston.format.json()
            ),
            handleExceptions: true
        })
    ],
    exitOnError: false
})


logger.stream = {
    write: (MessageChannel, encoding) => logger.info(message)
}

app.use(morgan('combined', {'stream': logger.stream}))

// logger.emitErrs = false
// logger.error('Error for log file!')

app.get('/', (req, res) => res.status(200).json({name: 'tobi'}))

// const fs = require('fs')
// fs.readFile('file.txt', (err, data) => {
//     throw new Error('Something wrong!')
//     console.log(data)
// })
app.listen(PORT, () => logger.info(`${String.fromCodePoint(9749)} is ready on port ${PORT}`))
// app.listen(app.get('port'), ()=>{
//     console.log('running on port', app.get('port'))
// })

module.exports = {app}

// let debug = require('./debug')
// debugger