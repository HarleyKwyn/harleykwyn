var socket_port = process.env.SOCKET_PORT || 4000,
		server_port	= process.env.SERVER_PORT || 3000;

var express 		= require('express'),
		io 					= require('socket.io').listen(socket_port),
		config 			= require('./config.json'),
		stream			= require('ntwitter'),
		twitter 		= new stream(config);
var app 				= express();
//Serve static files
app.use(express.static(__dirname + '/public'));

console.log('Server listening on port: '+server_port);
app.listen(server_port);
var watchSymbols = ['io14'];
io.onConnection
twitter.stream('statuses/filter', { track: watchSymbols }, function(stream) {
  //We have a connection. Now watch the 'data' event for incomming tweets.
  stream.on('data', function(tweet) {
  	console.log("tweet received");
	  io.emit('tweet', tweet);
	});
	stream.on('error', function(error, info){
		console.log("ERROR:" + error + " " + info);
	})
});

console.log('Socket port: '+ socket_port);