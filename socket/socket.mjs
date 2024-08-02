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

io.on('connection', socket => {
  console.log('A user connected')

  const roomId = socket.handshake.query.roomId
  if (roomId) {
    socket.join(roomId)
    console.log(`Socket joined room: ${roomId}`)
  } else {
    console.log('No roomId provided')
  }

  socket.on('message', msg => {
    if (roomId) {
      io.to(roomId).emit('message', msg)
      console.log(`Message sent to room ${roomId}:`, msg)
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

const PORT = 9000
const HOST = '0.0.0.0'
server.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`)
})
