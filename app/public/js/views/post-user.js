$(document).ready(function(){
    var uc = new UserControler();
    
});


function UserControler(){
    var that = this;
    $('#post-user-form').ajaxForm({
	url: '/userreport/user',
	data: { 'user': $('#post-user-txt').val()},
	beforeSubmit : function(formData, jqForm, options){
	    var name = $('#post-user-txt').val().trim();
	    if (name){
		window.location.href = "/userreport/user/"+name;
	    }else{
		return false;
	    }
	},
	success	: function(responseText, status, xhr, $form){
	    $('#post-user-txt').val('');
	   // window.location.href = "/userreport/user";
	    console.log("operation is successfull");
	},
	error : function(){
	    console.log("operation is not successfull");
	}
   });
};
