const express = require('express')
const {port} = require('../config/vars')
const handleCors = require('../utils/handleCors')
const {main} = require('../controllers/chatController.js')
const logger = require('morgan')
const {Server} = require('socket.io')
const {createServer} = require('node:http')
const app = express()

const server = createServer(app)
const ioServer = new Server(server, {
    connectionStateRecovery: {},
    cors: handleCors
})

ioServer.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log('an user has disconnected!!')
    })

    socket.on('event_message', (payload) => {
        const {room, message } = payload
        ioServer.to(`room_${room}`).emit('new_message', message)
    })

    socket.on('event_join', (room) => {
        socket.join(`room_${room}`)
    })

    socket.on('event_leave', (room) => {
        socket.leave(`room_${room}`)
    })
})

app.use(logger('dev'))

server.listen(port, () => {
    console.log(`listening in port ${port}`)
})

app.get('/', main)