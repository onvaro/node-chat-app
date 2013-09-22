var sio = require('socket.io')
	, fs = require('fs')
	, users = {};


module.exports = Sockets;

function Sockets (app, server) {
	var io = sio.listen(server);

	io.sockets.on('connection', function (socket) {
		
		socket.on('send', function (data) {
			broadcast('SEND', data.msg);
		});

		socket.on('join', function (data) {
			users[socket.id] = data;
			broadcast('JOIN', null);
			socket.emit('start session', users);
		});

		socket.on('disconnect', function () {
			broadcast('DISCONNECT', null);
			delete users[socket.id];
		});

		var broadcast = function (command, message) {
			var data = {
				cmd: command,
				msg: message,
				name: users[socket.id].name,
				id: socket.id
			}

			if (command === 'SEND') data.msg = data.name + ': ' + message;
			else if (command === 'JOIN') data.msg = data.name + ' has joined the room';
			else if (command === 'DISCONNECT') data.msg = data.name + ' has left the room';

			io.sockets.emit('chat', data);
		};		
	})
};