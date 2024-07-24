import Ws from 'App/Services/Ws'
Ws.boot()


Ws.io.on('connection', (socket) => {

  console.log('Um cliente se conectou.');
  console.log('New connection:', socket.id)

})

