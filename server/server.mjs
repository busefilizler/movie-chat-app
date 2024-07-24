import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

app.use(cors({
  origin: '*',
}))

// Define the room name
const ROOM_NAME = 'global_room'
io.on('connection', socket => {
  console.log('A user connected')

  // Automatically join the socket to the specified room
  socket.join(ROOM_NAME)

  socket.on('message', msg => {
    // Broadcast message to the room
    io.to(ROOM_NAME).emit('message', msg)
    console.log(msg)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

const PORT = 7000
const HOST = '192.168.203.104'
server.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`)
})
