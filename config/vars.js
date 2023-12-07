require('dotenv').config()

const port = process.env.PORT || 3000
const allowedOrigins = ['http://localhost:4200']

module.exports = {
    port,
    allowedOrigins
}