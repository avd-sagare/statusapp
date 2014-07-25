var DB                  = require('./db-connection.js');
var mongoose            = require('mongoose');
var db                  = DB.getConnection();
var moment 		= require('moment');
var status              = db.collection('post_status');

getWeekReport = function(days,callback)
{

    status.find(
	/*{
	    day: { $gte:days.firstday }
	}*/).toArray(
	function(e,res){
	    if (e){
		callback(e);
	    }else{
		callback(null,res);
	    }
	}
    );

}

exports.weekReport = function(req,res)
{
    var days = getWeekDays();
    var week = getWeek(days.firstday);
    getWeekReport(
	days,
	function(e,rest){
	    // Need to fix 
	    var rst = dateCompare(days.firstday,days.lastday,rest);
	    res.render('report', { 
		reports: rst,
		next:days.lastday,
		previous:days.firstday,
		week:week,
		startWeek:moment(days.firstday).format("MMMM Do YYYY"),
		endWeek:moment(days.lastday).format("MMMM Do YYYY")
	    });
	}
    );

};



dateCompare = function(startDate,endDate,dates)
{
    var index;
    var tempDate=startDate;
    var weekArray = [];
    var weekResults = [];
    for(var i=0;i<7;i++){
	weekArray.push(
	    moment(
		new Date(tempDate.setDate(startDate.getDate()+i))
		
	    ).format("MMMM Do YYYY")
	);
	new Date(tempDate.setDate(startDate.getDate()-i));
    };
    
    for (index = 0; index < dates.length; ++index) {
	var statDate = dates[index].date.split(",");
	// Could not find in array.in method 
	if (arrayContains(weekArray,statDate[0])){
	    weekResults.push(dates[index]);
	}
    };
    
    weekResults = userView(weekResults);
    //console.log(weekResults);
    return weekResults;
};


arrayContains = function(weekArray,str){
   for(var i =0;i<weekArray.length;i++){
       if(weekArray[i] == str){
	   return true;
       }
   };
   return false;
};

getWeekDays = function(){
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    /*
    var firstday = moment(new Date(curr.setDate(first))).format("MMMM Do YYYY"); 
    var lastday = moment(new Date(curr.setDate(last))).format("MMMM Do YYYY"); 
    */

    var firstday = new Date(curr.setDate(first)); 
    var lastday = new Date(curr.setDate(last)); 

    return{
	firstday:firstday,
	lastday:lastday
    };

};



// This function is copied from https://gist.github.com/dblock/1081513
getWeek = function( d ) {
     // Create a copy of this date object
    var target = new Date(d.valueOf());
    // ISO week date weeks start on monday
    // so correct the day number
    var dayNr = (d.getDay() + 6) % 7;
     // Set the target to the thursday of this week so the
    // target date is in the right year
    target.setDate(target.getDate() - dayNr + 3);
    
    // ISO 8601 states that week 1 is the week
    // with january 4th in it
    var jan4 = new Date(target.getFullYear(), 0, 4);
     // Number of days between target date and january 4th
    var dayDiff = (target - jan4) / 86400000;
     // Calculate week number: Week 1 (january 4th) plus the
    // number of weeks between target date and january 4th
    var weekNr = 1 + Math.ceil(dayDiff / 7);
    return weekNr;
 }

getStartOfWeek = function(curr){
    var tempDate=curr;
    tempDate.setDate(curr.getDate()-7);
    return tempDate;
};

exports.previousWeekReport = function(req,res,day)
{
    var startDate = getStartOfWeek(new Date(day));
    var endDate = new Date(day);
    var days; // Not need at this point of time
    var week = getWeek(startDate);
    getWeekReport(
	days,
	function(e,rest){
	    var rst = dateCompare(startDate,endDate,rest);
	    res.render('report', {  
		reports: rst,
		next:endDate,
		previous:startDate,
		week:week,
		startWeek:moment(startDate).format("MMMM Do YYYY"),
		endWeek:moment(endDate).format("MMMM Do YYYY")
	    });
	}
    );
};

getEndOfWeek = function(curr){
    var tempDate=curr;
    tempDate.setDate(curr.getDate()+7);
    return tempDate;
};

exports.nextWeekReport = function(req,res,day)
{
    var endDate = getEndOfWeek(new Date(day));
    var startDate = new Date(day);
    var days; // Not need at this point of time
    var week = getWeek(startDate);
    getWeekReport(
	days,
	function(e,rest){
	    var rst = dateCompare(startDate,endDate,rest);
	    res.render('report', {  
		reports: rst,
		next:endDate,
		previous:startDate,
		week:week,
		startWeek:moment(startDate).format("MMMM Do YYYY"),
		endWeek:moment(endDate).format("MMMM Do YYYY")
	    });
	}
    );
};
