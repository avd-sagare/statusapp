var DB                  = require('./db-connection.js');
var mongoose            = require('mongoose');
var db                  = DB.getConnection();
var moment 		= require('moment');
var status              = db.collection('post_status');
var CD                  = require('./common-date-functs.js')

getMonthReport = function(user,callback)
{
    status.find(
	{
	    "user":user
	}).toArray(
	function(e,res){
	    if (e){
		callback(e);
	    }else{
		callback(null,res);
	    }
	}
    );
};

exports.userReport = function(req,res,userName)
{
    getMonthReport(userName,
	function(err,result){
	    var currDay = new Date();
	    var firstDay = new Date(currDay.getFullYear(), currDay.getMonth(), 1);
	    var rst= CD.monthFilter(firstDay,result);
	    var nextDayMonth = getNextMonth(firstDay);
	    var prevDayMonth = getPrevMonth(firstDay);
	    var month = CD.getMonth(currDay.getMonth());
	    res.render('user-report',{
		"userName":userName+"'s",
		"results":rst,
		"month":month,
		"prev":"/userreport/user/"+userName+"/previous/"+prevDayMonth,
		"next":"/userreport/user/"+userName+"/next/"+nextDayMonth,
		"reportName":"Monthly Summary",
	    });
	}
    );
    
};


exports.userNextMonthReport = function(req,res,userName,startDate)
{
    getMonthReport(userName,
	function(err,result){
	    var currDay = new Date(startDate);
	    var firstDay = new Date(currDay.getFullYear(), currDay.getMonth(), 1);
	    var rst= CD.monthFilter(firstDay,result);
	    var nextDayMonth = getNextMonth(firstDay);
	    var prevDayMonth = getPrevMonth(firstDay);
	    var month = CD.getMonth(currDay.getMonth());
	    res.render('user-report',{
		"userName":userName+"'s",
		"results":rst,
		"month":month,
		"prev":"/userreport/user/"+userName+"/previous/"+prevDayMonth,
		"next":"/userreport/user/"+userName+"/next/"+nextDayMonth,
		"reportName":"Monthly Summary",
	    });
	}
    );
    
};

getNextMonth = function(firstDay)
{
    if (firstDay.getMonth() == 11) {
	var nextDayMonth = new Date(firstDay.getFullYear() + 1, 0, 1);
    } else {
	var nextDayMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 1);
    }
    return nextDayMonth;
};

getPrevMonth = function(firstDay)
{
    if (firstDay.getMonth() == 0) {
	var nextDayMonth = new Date(firstDay.getFullYear() - 1, 11, 1);
    } else {
	var nextDayMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() - 1, 1);
    }
    return nextDayMonth;
};
exports.getUser = function(req,res)
{
    res.render('get-user');
};

// Tag related functions 
tagSearch = function(tag,callback)
{
    status.find(
	{
	    "status":{$regex:tag}
	}).toArray(
	function(e,res){
	    if (e){
		callback(e);
	    }else{
		callback(null,res);
	    }
	}
    );
};

exports.getTag = function(req,res)
{
    res.render('get-tag');
};


exports.tagReport = function(req,res,tagName)
{
    tagSearch(tagName,
	function(err,result){
	    var currDay = new Date();
	    var firstDay = new Date(currDay.getFullYear(), currDay.getMonth(), 1);
	    var rst= CD.monthFilter(firstDay,result);
	    var nextDayMonth = getNextMonth(firstDay);
	    var prevDayMonth = getPrevMonth(firstDay);
	    var month = CD.getMonth(currDay.getMonth());
	    res.render('user-report',{
		"userName":tagName,
		"results":rst,
		"month":month,
		"prev":"/tag/tagname/"+tagName+"/previous/"+prevDayMonth,
		"next":"/tag/tagname/"+tagName+"/next/"+nextDayMonth,
		"reportName":""
	    });
	}
    );
    
};


exports.tagMonthReport = function(req,res,tagName,startDate)
{
    tagSearch(tagName,
	function(err,result){
	    var currDay = new Date(startDate);
	    var firstDay = new Date(currDay.getFullYear(), currDay.getMonth(), 1);
	    var rst= CD.monthFilter(firstDay,result);
	    var nextDayMonth = getNextMonth(firstDay);
	    var prevDayMonth = getPrevMonth(firstDay);
	    var month = CD.getMonth(currDay.getMonth());
	    res.render('user-report',{
		"userName":tagName,
		"results":rst,
		"month":month,
		"prev":"/tag/tagname/"+tagName+"/previous/"+prevDayMonth,
		"next":"/tag/tagname/"+tagName+"/next/"+nextDayMonth,
		"reportName":"",
	    });
	}
    );
    
};


getAllReport = function(callback)
{
    status.find(
	{

	}).toArray(
	function(e,res){
	    if (e){
		callback(e);
	    }else{
		callback(null,res);
	    }
	}
    );
};

exports.monthReport = function(req,res,tagName)
{
    getAllReport(
	function(err,result){
	    var currDay = new Date();
	    var firstDay = new Date(currDay.getFullYear(), currDay.getMonth(), 1);
	    var rst= CD.monthFilter(firstDay,result);
	    var nextDayMonth = getNextMonth(firstDay);
	    var prevDayMonth = getPrevMonth(firstDay);
	    var month = CD.getMonth(currDay.getMonth());
	    res.render('user-report',{
		"userName":"Platform i18n - Monthly Summary",
		"results":rst,
		"month":month,
		"prev":"/monthreport"+"/previous/"+prevDayMonth,
		"next":"/monthreport"+"/next/"+nextDayMonth,
		"reportName":""
	    });
	}
    );
    
};


exports.generalMonthReport = function(req,res,startDate)
{
    getAllReport(
	function(err,result){
	    var currDay = new Date(startDate);
	    var firstDay = new Date(currDay.getFullYear(), currDay.getMonth(), 1);
	    var rst= CD.monthFilter(firstDay,result);
	    var nextDayMonth = getNextMonth(firstDay);
	    var prevDayMonth = getPrevMonth(firstDay);
	    var month = CD.getMonth(currDay.getMonth());
	    res.render('user-report',{
		"userName":"Platform i18n - Monthly Summary",
		"results":rst,
		"month":month,
		"prev":"/monthreport"+"/previous/"+prevDayMonth,
		"next":"/monthreport"+"/next/"+nextDayMonth,
		"reportName":"",
	    });
	}
    );
    
};



exports.topicReport = function(req,res)
{
    getAllReport(
	function(err,result){
	    var currDay = new Date();
	    var firstDay = new Date(currDay.getFullYear(), currDay.getMonth(), 1);
	    var rst= CD.topicFilter(firstDay,result);
	    var nextDayMonth = getNextMonth(firstDay);
	    var prevDayMonth = getPrevMonth(firstDay);
	    var month = CD.getMonth(currDay.getMonth());
	    res.render('topic-report',{
		"userName":"Platform i18n - Monthly Summary",
		"results":rst,
		"month":month,
		"prev":"/topicreport"+"/previous/"+prevDayMonth,
		"next":"/topicreport"+"/next/"+nextDayMonth,
		"reportName":""
	    });
	}
    );
    
};



exports.generalTopicReport = function(req,res,startDate)
{
    getAllReport(
	function(err,result){
	    var currDay = new Date(startDate);
	    var firstDay = new Date(currDay.getFullYear(), currDay.getMonth(), 1);
	    var rst= CD.topicFilter(firstDay,result);
	    var nextDayMonth = getNextMonth(firstDay);
	    var prevDayMonth = getPrevMonth(firstDay);
	    var month = CD.getMonth(currDay.getMonth());
	    res.render('topic-report',{
		"userName":"Platform i18n - Monthly Summary",
		"results":rst,
		"month":month,
		"prev":"/topicreport"+"/previous/"+prevDayMonth,
		"next":"/topicreport"+"/next/"+nextDayMonth,
		"reportName":"",
	    });
	}
    );
    
};
