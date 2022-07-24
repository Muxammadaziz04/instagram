const dotenv = require('dotenv')
dotenv.config()

let pgConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    ssl: {
    rejectUnauthorized: false,
    }
}

module.exports = {
    pgConfig
}