var DB                  = require('./db-connection.js');
var db                  = DB.getConnection();

var topics              = db.collection('topics');


exports.getAllRecords = function(callback)
{
	topics.find().toArray(
	    function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

