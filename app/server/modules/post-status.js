
var DB                  = require('./db-connection.js');
var db                  = DB.getConnection();
var moment 		= require('moment');

var status              = db.collection('post_status');


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


get_tags = function(status){
    var topic = status.split(" ")[0];
    if( topic.substr(topic.length - 1) == ":"){
	return [topic];
    }
    return null;
    //return status.match(/\w+:/g)
};

