var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000
var user_count = 0

io.on('connection', function(socket){
		user_count++;
		// io.sockets.emit -- all usres
		io.emit('user_count', user_count)

  socket.on('disconnect', function(){
  	user_count--;
		io.emit('user_count', user_count)

  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	io.emit('chat message', msg);
  });
});

app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, function(){
  console.log('listening on localhost:' + port);
});


function updateUserCount(num) {

}