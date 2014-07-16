
var MongoDB 	        = require('mongodb').Db;
var Server 		= require('mongodb').Server;


var dbPort 		= 27017;
//var dbHost 		= 'localhost';
var dbHost              = process.env.OPENSHIFT_MONGODB_DB_HOST || '127.0.0.1';
var dbUser              = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
var dbPass              = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;

var dbName 		= 'statusapp';


/* establish the database connection */

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
	        db.authenticate(dbUser, dbPass, function(err, res) {
                    // callback                                                                                           
                });
		console.log('connected to database :: ' + dbName);
	}
});

exports.getConnection = function()
{
    return db;
}
    

