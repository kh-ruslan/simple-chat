const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000
var online_list = []

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    io.emit('online', online_list)

    socket.on('online', (name) => {
        socket.username = name
        online_list.push(name)
        io.emit('online', online_list)
    })

    socket.on('disconnect', () => {
        var index = online_list.indexOf(socket.username)
        if (index >= 0) {
            online_list.splice(index, 1)
        }
        io.emit('online', online_list)
    })

    socket.on('chat', (data) => {
        socket.broadcast.emit('chat', { name: data.name, text: data.text, time: data.time })
    })
})

http.listen(port)
