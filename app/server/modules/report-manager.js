var DB                  = require('./db-connection.js');
var mongoose            = require('mongoose');
var db                  = DB.getConnection();
var moment 		= require('moment');
var status              = db.collection('post_status');
var CD                  = require('./common-date-functs');

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
		next:week+1+"/"+days.firstday.getFullYear(),
		previous:week-1+"/"+days.firstday.getFullYear(),
		week:week,
		startWeek:moment(days.firstday).format("MMMM Do YYYY"),
		endWeek:moment(days.lastday).format("MMMM Do YYYY")
	    });
	}
    );

};


exports.weekReports = function(req,res,weekNo,year)
{
    genericWeekReport(req,res,CD.getDateOfWeek(weekNo,year));
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
    var first = curr.getDate() - curr.getDay()+1; // First day is the day of the month - the day of the week
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



getEndOfWeek = function(curr){
    var tempDate=curr;
    tempDate.setDate(curr.getDate()+7);
    return tempDate;
};

genericWeekReport = function(req,res,day)
{
    var endDate = getEndOfWeek(new Date(day));
    var startDate = new Date(day);
    var days; // Not need at this point of time
    var week = getWeek(startDate);
    //var week = startDate.getWeek();
    var nextYear = startDate.getFullYear();
    var prevYear = endDate.getFullYear();
    if (nextYear == 2016){
	week = startDate.getWeek();
    };
    if (week == 53){
	week = 1;
	nextYear = nextYear+1;
    };
    
    if ( week == 1){
	if (prevYear!= nextYear){
	    nextYear = nextYear+1;
	}
    }
    var prevWeekNo = week-1;
    var nextWeekNo = week+1;
    if (week == 52){
	nextWeekNo = 1;
	nextYear = nextYear+1;
    };

    if ( week == 1){
	prevWeekNo = 52;
	if (prevYear == nextYear){
	    prevYear = prevYear-1;
	}
    }
    getWeekReport(
	days,
	function(e,rest){
	    var rst = dateCompare(startDate,endDate,rest);
	    res.render('report', {  
		reports: rst,
		next:nextWeekNo+"/"+nextYear,
		previous:prevWeekNo+"/"+prevYear,
		week:week,
		startWeek:moment(startDate).format("MMMM Do YYYY"),
		endWeek:moment(endDate).format("MMMM Do YYYY")
	    });
	}
    );
};



Date.prototype.getWeek = function (dowOffset) {
/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.epoch-calendar.com */

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
			     (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
	weeknum = Math.floor((daynum+day-1)/7) + 1;
	if(weeknum > 52) {
	    nYear = new Date(this.getFullYear() + 1,0,1);
	    nday = nYear.getDay() - dowOffset;
	    nday = nday >= 0 ? nday : nday + 7;
	    /*if the next year starts before the middle of
	        the week, it is week #1 of that year*/
	    weeknum = nday < 4 ? 1 : 53;
	    }
	}
    else {
	weeknum = Math.floor((daynum+day-1)/7);
	}
    return weeknum;
};
