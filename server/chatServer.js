const chatServer = (io) => {

    console.log("Chat Server Started!");
 
    io.on('connection', function(socket){
        console.log(`a user connected with id ${socket.conn.id}`);
        socket.emit('FreackMessage','Bienvenido a la Lobby de FreaksForum!');
        
        // Receive the message
        socket.on('FreackMessage', data => {
            console.log(data)
            console.log("siuuuuu");
            socket.broadcast.emit('FreackMessage',data);
        });

        socket.on('messageto', data => {
            console.log(data)
            socket.broadcast.emit(data.idbueno ,data.message);
            socket.emit(data.myId, data.message)
        });
 
    });
 
 };
 
 module.exports = chatServer;