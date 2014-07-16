var socketio = require('socket.io');
var io;

module.exports.listen = function(app)
{		      
    io = socketio.listen(app);
    io.set('log level', 5);
    exports.sockets = io.sockets;
    io.sockets.on('connection', function (socket)
    {
        console.log("******new connection: "+socket.id);
        socket.on('disconnect',function(){console.log("device "+socket.id+" disconnected");});
        socket.emit('news');
	//io.sockets.send(120);
	/*
        socket.on('reloadAccounts',function(data)
        {
            var accounts=['account1','account2']
            socket.emit('news',accounts)
        });
	*/
	/*
	socket.on('eventready',function(data)
	{
	    console.log('Anish ready function called');
	      
        });
	*/
    });

    return io;
}



/*
module.exports.send_msg = function()
{
	io.sockets.sockets[skfd].emit('ready',120);
}
*/	

