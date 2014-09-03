var DB                  = require('./db-connection.js');
var mongoose            = require('mongoose');

var db                  = DB.getConnection();
var moment 		= require('moment');

var status              = db.collection('post_status');



exports.getStatus = function(req,response)
{
    response.contentType('json');
    getAllStatus(
	function(e,res){
	    response.send(res);
	}
    );
};



getAllStatus = function(callback)
{
	status.find().sort({_id:-1}).toArray(
		function(e, res) {
		if (e) callback(e)
		else{
		    callback(null, res.slice(0,50))
		}
	});
};


exports.deleteStatus = function(id)
{
    status.remove({
	 _id: new  mongoose.Types.ObjectId(id)
	},function(err,removed){
	    console.log(err);
        }
    );
};


