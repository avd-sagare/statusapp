$(document).ready(function(){
    var tg = new TagControler();
    
});


function TagControler(){
    var that = this;
    $('#post-tag-form').ajaxForm({
	url: '/tag',
	data: { 'tagname': $('#post-tag-txt').val()},
	beforeSubmit : function(formData, jqForm, options){
	    var name = $('#post-tag-txt').val().trim();
	    if (name){
		window.location.href = "/tag/tagname/"+name;
	    }else{
		return false;
	    }
	},
	success	: function(responseText, status, xhr, $form){
	    $('#post-tag-txt').val('');
	   // window.location.href = "/userreport/user";
	    console.log("operation is successfull");
	},
	error : function(){
	    console.log("operation is not successfull");
	}
   });
};
