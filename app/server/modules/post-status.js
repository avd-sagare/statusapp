
var DB                  = require('./db-connection.js');
var db                  = DB.getConnection();
var moment 		= require('moment');

var status              = db.collection('post_status');



exports.insertStatus = function(newData,callback)
{
    newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    newData.tags = get_tags(newData.status);
    status.insert(newData, {safe: true}, callback);
 }


get_tags = function(status){
    return status.match(/\w+:/g)
}

