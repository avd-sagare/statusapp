var moment 		= require('moment');

exports.getMonth = function(index)
{
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[index]; 
}


// Not a big fan of cryptic code but like this answer from stackoverflow

getDaysInMonth = function(m, y) {
   return /8|3|5|10/.test(--m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31;
}

arrayContains = function(array,str){
   for(var i =0;i<array.length;i++){
       if(array[i] == str){
	   return true;
       }
   };
   return false;
};

exports.monthFilter = function(startDate,results)
{
    var index;
    var tempDate=startDate;
    var monthArray = [];
    var monthResults = [];
    var noDays = getDaysInMonth(startDate.getMonth()+1,startDate.getYear());
    for(var i=0;i<noDays;i++){
	monthArray.push(
	    moment(
		new Date(tempDate.setDate(startDate.getDate()+i))
		
	    ).format("MMMM Do YYYY")
	);
	new Date(tempDate.setDate(startDate.getDate()-i));
    };
    
    for (index = 0; index < results.length; ++index) {
	var statDate = results[index].date.split(",");
	// Could not find in array.in method 
	if (arrayContains(monthArray,statDate[0])){
	    monthResults.push(results[index]);
	}
    };
    
    monthResults = userView(monthResults);
    //console.log(monthResults);
    return monthResults;
};

// This function does nothing but format's json object in user and its status format
userView = function(json){
    var user = {};
    for (var i =0;i< json.length;i++){ 
	if (json[i].user in user){
            user[json[i].user].push(json[i].status);        
	}else{
            user[json[i].user] = [ json[i].status ];   
	}
    }
    var keys = Object.keys(user);
    keys.sort();
    var send_obj = [];
    for (var i=0;i<keys.length;i++) {
	var key = keys[i];
	var temp_object={};
	temp_object['user']= key;
	temp_object['status']= user[key];
	send_obj.push(temp_object);
    }
    return send_obj;
};
