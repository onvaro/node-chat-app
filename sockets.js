var sio = require('socket.io')
	, fs = require('fs');


module.exports = Sockets;

function Sockets (app, server) {
	var io = sio.listen(server);

	io.sockets.on('connection', function (socket) {
		socket.emit('chat', {welcome: 'Emit your response to enter'})

		socket.on('chat response', function(data) {
			console.log(data);
		});
	})
}	