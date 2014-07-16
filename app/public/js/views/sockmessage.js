
$(document).ready(function(){
    
    var gs = new GetStatus();
    
    io.connect().on('message', function ( count ) {
	//getStatus();
	gs.get_me();
    });
    
    /*
    $('#edit-status-form').ajaxForm({
	    url: '/poststatus/update',
	    data: { 
		'id': $('#modal-edit-status  .modal-body p').text(),
		'status': $('#modal-edit-status  #edit-stat').val()
	    },
	    beforeSubmit : function(formData, jqForm, options){
		alert("before submit");
	    },
	    success	: function(responseText, status, xhr, $form){
		$('#modal-edit-status').modal('hide');
		$('#modal-edit-status').remove();
		console.log("operation is successfull");
	    },
	    error : function(){
		console.log("operation is not successfull");
	    }
    });
    */
    
    //getStatus();
    gs.get_me();
});


function GetStatus(){
    //editStatus = $('#modal-edit-status');
    //editStatus.modal({ show : false, keyboard : true, backdrop : true });
    //$('#modal-edit-status  #submit.btn').click(function(){$('#modal-edit-status  #edit-stat').text('ramesh');});
    var that = this;
    var myBackup = $('#modal-edit-status').clone();
    
    

    this.sendStatus = function(id,status){

	$('#edit-status-form').ajaxForm({
	    url: '/poststatus/update',
	    data: { 
		'id': id,
		'status':status
	    },
	    beforeSubmit : function(formData, jqForm, options){
	    
	    },
	    success	: function(responseText, status, xhr, $form){
		$('#modal-edit-status').modal('hide');
		$('#modal-edit-status').remove();
		//myBackup.modal('hide');
		//$('body').append(myBackup);
		console.log("operation is successfull");
	    },
	    error : function(){
		console.log("operation is not successfull");
	    }
	});
    };
    
    
    
    
    $('body').on('hidden.bs.modal', '.modal', function () {
        $(this).removeData('bs.modal');
	alert("Model removed");
    });

    

    this.editStatusCallback = function(id,status)
    {
        if ($('#modal-edit-status').length >= 1){
	}else{
            $('body').append(myBackup);
	}
	$('#modal-edit-status  #submit.btn').click(function(){
	    that.sendStatus(
		$('#modal-edit-status  .modal-body p').text(),
		$('#modal-edit-status  #edit-stat').val()
	    );
	});
        $('#modal-edit-status .modal-body p').text(id);
	$('#modal-edit-status  #edit-stat').text(status);
	$('#modal-edit-status').modal('show');
    };

    this.deleteStatusCallback = function(id)
    {
	$.ajax({
	    url: '/deletestatus',
	    type: 'POST',
	    data: {
		'id' : id
	    },
	    success: function(data){
		
	    },
	    error: function(jqXHR){
		console.log("Error in delete status");
		//console.log(jqXHR);
		//console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
	    }
	});
    };
    
    this.get_me = function()
    {
	var that = this;
	/*
        $.ajax({
	    url: '/getstatus',
	    type: 'GET',
	    success: function(data){
		$('#getstatus').html("");
		$.each(data, function( index, obj ) {
		    //$('#statusmsg').append($('<li/>', {text: obj.status }));
		    var newDiv =  $("<div />"); 
		    var textArea = $('<textarea  style="width:397px;height:63px"   / > '); 
		    //textArea.css("span5 required");
		    textArea.attr('readonly','readonly');
		    textArea.text(obj.status);
		    $('#getstatus').append(newDiv.append(textArea));
		    $('#getstatus').css("span5 required");
		    var buttonDiv =  $("<div  />"); 
		    buttonDiv.css('.edit_buttons');
		    var deleteButton = $("<button class='btn btn-primary'><i class='icon-lock icon-white'></i> Delete Staus </button> ");
		    var editButton = $("<button class='btn btn-primary'><i class='icon-lock icon-white'></i>Edit Status </button> ");
		    editButton.click(function(){ that.editStatusCallback(obj._id,obj.status); });
		    buttonDiv.append(deleteButton);
		    buttonDiv.append(editButton);
		    $('#getstatus').append(buttonDiv);
		});
	    },
	    error: function(jqXHR){
		console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
	    }
	});

       */
	$.getJSON( "/getstatus", function( data ) {
	    $('#getstatus').html("");
	    $.each(data, function( index, obj ) {
		var newDiv =  $("<div />"); 

		var deleteButton = $("<button> Delete </button> ");
		deleteButton.addClass('btn');
		deleteButton.addClass('btn-primary');
		var editButton = $("<button> Edit </button> ");
		editButton.addClass('btn-primary');
		editButton.addClass('btn');
		editButton.click(function(){ that.editStatusCallback(obj._id,obj.status); });
		deleteButton.click(function(){ that.deleteStatusCallback(obj._id); });
		newDiv.append(deleteButton);
		newDiv.append(editButton);
		

		var tags = $('<p />');
		tags.html(obj.user);
		tags.append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp');
		tags.append(obj.date);
		//tags.addClass('span4');
		newDiv.append(tags);

		var textArea = $('<textarea    / > '); 
		textArea.attr('readonly','readonly');
		textArea.text(obj.status);
		textArea.addClass('span4');
		newDiv.append(textArea);
		
		//newDiv.addClass('well');
		//newDiv.addClass('span4');
		newDiv.addClass('edit_buttons');
		
		$('#getstatus').append(newDiv);
	    });
	});
    }; 
  
}
