
/**
	* Node.js Login Boilerplate
	* More Info : http://bit.ly/LsODY8
	* Copyright (c) 2013 Stephen Braitsch
**/

var express = require('express');
var http = require('http');
var app = express();

//var socketIo = require( 'socket.io' );
var port = process.env.OPENSHIFT_NODEJS_PORT || '8080';
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.configure(function(){
	app.set('port', port);
	app.set('views', __dirname + '/app/server/views');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
//	app.use(express.favicon());
//	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'super-duper-secret-secret' }));
	app.use(express.methodOverride());
	app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
	app.use(express.static(__dirname + '/app/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

require('./app/server/router')(app);


var server = http.createServer(app);

var io1 = require('./app/server/sk.io').listen(server)


server.listen(app.get('port'),ip, function(){
    console.log("Express server listening on port " + app.get('port'));
});




//io.sockets.send(2300);
