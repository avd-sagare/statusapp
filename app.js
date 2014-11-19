
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
var irc = require('irc');

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

var bot = new irc.Client('chat.freenode.net', 
			 process.env.OPENSHIFT_APP_NAME || 'statusbot', {
    channels: ['#fedora-i18n'],
    port: 8001,
    debug: false
});

var InsertStatus = require('./app/server/modules/post-status');

bot.addListener('message', function(from, to, message) {
    var msg = message.split(' ')[0];
    if( msg == '#statusapp')
    {
	var user_name = message.split(' ')[1];
	// Non sync way
	var uid = InsertStatus.getUid(user_name,function(uid){ 
	    if(uid !=null){
		var status = message.substr(msg.length+user_name.length+1);
		status = status.trim();
		InsertStatus.insertStatus({
		    uid         : uid,
		    user 	: user_name,
		    status 	: status
		},function(e){
		    if (e){
			bot.say(to, "Status could not be  inserted");
		    }else{
			bot.say(to, "Status successfully inserted");
		    }
		});
	    }else{
		bot.say(to, "Check name e.g #statusapp name msg");
	    }
	});
    }
});




//io.sockets.send(2300);
