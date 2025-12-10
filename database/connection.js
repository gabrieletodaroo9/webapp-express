const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

connection.connect((err) => {
    if (err) {
        throw err.message
    }
    console.log('Connection Succesful!')
})

module.exports = connection