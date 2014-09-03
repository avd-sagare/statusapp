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


exports.getDateOfWeek = function(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
};


exports.topicFilter = function(startDate,results)
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
    monthResults = removeTopics(monthResults);
    monthResults = topicView(monthResults);
    //console.log(monthResults);
    return monthResults;
};

removeTopics = function(json){

    for (var i =0;i< json.length;i++){
	if ( json[i].tags != null){
	    for ( var j=0; j< json[i].tags.length;j++){
		json[i].status=json[i].status.replace(json[i].tags[j],"");
	    }
	}
    }
    return json;
};

topicView = function(json){
    var topic = {};
    for (var i =0;i< json.length;i++){
	if ( json[i].tags != null){
	    for ( var j=0; j< json[i].tags.length;j++){
		if (json[i].tags[j] in topic){
		    var tmp_obj = {"status":json[i].status,"user":json[i].user};
		    topic[json[i].tags[j]].push(tmp_obj);        
		}else{
		    var tmp_obj = {"status":json[i].status,"user":json[i].user };
		    topic[json[i].tags[j]] = [ tmp_obj];   
		}
	    }
       }
    }
    var keys = Object.keys(topic);
    keys.sort();
    
    var send_obj = [];
    for (var i=0;i<keys.length;i++) {
	var key = keys[i];
	var temp_object={};
	temp_object['topic']= key;
	for ( var j=0;j<topic[key].length;j++){
	    if ("posts" in temp_object){
		var tmp_obj = {"post":topic[key][j].status,"user":topic[key][j].user}
		temp_object['posts'].push(tmp_obj);
	    }else{
		var tmp_obj = {"post":topic[key][j].status,"user":topic[key][j].user}
		temp_object['posts']= [ tmp_obj ];
	    }
	    // To print status
	    //console.log(topic[key][j].status);
	}
	send_obj.push(temp_object);
    }
    return send_obj;
};
