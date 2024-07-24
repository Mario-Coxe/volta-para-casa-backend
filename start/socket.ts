import Ws from 'App/Services/Ws'
Ws.boot()


Ws.io.on('connection', (socket) => {

  console.log('Um cliente se conectou.');
  console.log('New connection:', socket.id)

  socket.emit('news', { hello: 'world' })


  socket.on('my other event', (data) => {
    console.log(data)
  })



  // socket.on('new:invitation', (data) => {
  //   console.log('Received new invitation:', data);
  //   Ws.io.emit('new:invitation', data);
  // });



})

