const { instrument } = require('@socket.io/admin-ui');

const io = require('socket.io')(8080,{
    cors:{
        origin:['https://admin.socket.io','http://localhost:3000']
    }
});

io.on('connection',(socket,room)=>{
    console.log(socket.id);
    socket.on('send-message',(message,room)=>{
        // io.emit('receive-message', message) // this will sent to all receiver including self
        
        if(room === ''){
            socket.broadcast.emit('receive-message',message);
        }
        else{
            socket.to(room).emit('receive-message',message);
        }
        console.log(message);
    })

    socket.on('join-room',(room,cb)=>{
        socket.join(room);
        cb(`Joined ${room}`)
    })
})

console.log('hi')

instrument(io, { auth :false});