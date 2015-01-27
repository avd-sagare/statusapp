
var DB                  = require('./db-connection.js');
var db                  = DB.getConnection();
var moment 		= require('moment');

var status              = db.collection('post_status');
var mongoose            = require('mongoose');
var accounts            = db.collection('accounts');

is_valid_date = function(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}

exports.insertStatus = function(newData,callback)
{
    newData.status = newData.status.trim();
    curr_date = newData.status.split(" ")[0];
    var d = new Date(curr_date);
    if(is_valid_date(d)){
	newData.status = newData.status.replace(curr_date,"");
	newData.date = moment(curr_date).format('MMMM Do YYYY, h:mm:ss a');
    }else{
	newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    }
    newData.tags = get_tags(newData.status.trim());
    if ( newData.tags == null){
	// No tags have been defined, insert default :misc tag
	newData.status = "misc: "+ newData.status;
	newData.tags = ['misc:'];
    }
    status.insert(newData, {safe: true}, callback);
 };



exports.updateStatus = function(newData,callback)
{
    var id = new  mongoose.Types.ObjectId(newData.id);
    newData.status = newData.status.trim();
    var curr_date = newData.status.split(" ")[0];
    var d = new Date(curr_date);
    if(is_valid_date(d)){
	newData.status = newData.status.replace(curr_date,"");
	newData.status = newData.status.trim();
	newData.date = moment(curr_date).format('MMMM Do YYYY, h:mm:ss a');
	status.update(
	    {_id:id},
	    {
		$set:{date:newData.date}
	    },
	    callback
	);
    }
    newData.tags = get_tags(newData.status.trim());
    if ( newData.tags == null){
	// No tags have been defined, insert default :misc tag
	newData.status = "misc: "+ newData.status;
	newData.tags = ['misc:'];
	status.update(
	    {_id:id},
	    {
		$set:{tags:newData.tags} 
	    },
	    callback
	);
    }
    status.update(
	{_id:id},
	{
	    $set:{ status:newData.status}
	},
	callback
    );
    //status.insert(newData, {safe: true}, callback);
 };


get_tags = function(status){
    var topic = status.split(" ")[0];
    if( topic.substr(topic.length - 1) == ":"){
	return [topic];
    }
    return null;
    //return status.match(/\w+:/g)
};

exports.getUid = function(user,callback)
{
    accounts.findOne({user:user}, function(e, o) {
	if (o){
	    callback(o._id);
	}else{
	    callback(null);
	}
    });
}
