
$(document).ready(function(){
    var sc = new StatusControler();

});


function StatusControler(){
    var that = this;

    /*
    $('#btn-poststatus').click(function(){ that.postStatus(); });
    
    this.postStatus = function(){
	window.location.href = '/poststaus'
	$.ajax({
	    url: '/poststatus',
	    type: 'POST',
	    data: { status: $('#post-status-txt').val()},
	    success: function(data){
		console.log("operation is successfull");
	    },
	    error: function(jqXHR){
		console.log("operation is not successfull");
		console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
	    }
	});
    };

    */
    $('#post-status-form').ajaxForm({
	url: '/poststatus',
	data: { 'status': $('#post-status-txt').val()},
	beforeSubmit : function(formData, jqForm, options){
	    var stat = $('#post-status-txt').val().trim();
	    if (stat){

	    }else{
		return false;
	    }
	},
	success	: function(responseText, status, xhr, $form){
	    $('#post-status-txt').val('');
	    console.log("operation is successfull");
	},
	error : function(){
	    console.log("operation is not successfull");
	}
   });
};
