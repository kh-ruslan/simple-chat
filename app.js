const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
	console.log('a user connected')
	socket.on('disconnect', () => console.log('user disconnected')
  )
})

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

http.listen(3000, () => console.log('listening on *:3000'))

