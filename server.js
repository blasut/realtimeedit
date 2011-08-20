var http = require('http');
var fs = require('fs');
var io = require('socket.io');
var clients = 0; 
var currentMessage = " ";

var server = http.createServer(function (request, response) {
	getIndex(request, response);
})
sio = io.listen(server);
server.listen(8000);

setInterval(function() {
	//console.log(sio.sockets);
}, 1000);


sio.sockets.on('connection', function (socket) {
	clients += 1;
	console.log("New client connected");
	
	socket.broadcast.emit('someone connected');
	console.log("Broadcast the emit");
	
	socket.on('writing', function(message, fn) {
		currentMessage = currentMessage + message;
		sio.sockets.emit('updateMessage', { text: message });
		
		// debugging
		console.log('emit updatemessage');
		console.log("NewMessage: " + message);
	});
	
});
sio.sockets.on('disconnect', function() {
	clients -= 1;
});




/* View specific functions. */
function getIndex(request, response) {
	var index = fs.readFileSync('public/index.html');
	
	response.writeHead(200, {
		'Content-type' : 'text/html; charset=utf-8'
	});
	response.end(index);
}

function getView(request, response) {
	// Look in the public directory for the specified filename + html.
}

console.log('Server running at http://127.0.0.1:8000/');