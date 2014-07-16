var DB                  = require('./db-connection.js');
var mongoose            = require('mongoose');
var db                  = DB.getConnection();
var moment 		= require('moment');
var status              = db.collection('post_status');
var CD                  = require('./common-date-functs.js')

exports.getUser = function(req,res)
{
    res.render('get-tag');
};
