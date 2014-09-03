
function HomeController()
{

// bind event listeners to button clicks //
	var that = this;

        $('#btn-home').click(function(){ that.attemptHome(); });

        $('#btn-report').click(function(){ that.attemptWeekReport(); });

        $('#btn-user-report').click(function(){ that.attemptUserReport(); });

        $('#btn-tag-report').click(function(){ that.attemptTagReport(); });

        $('#btn-monthly-report').click(function(){ that.attemptMonthReport(); });

        $('#btn-topic-report').click(function(){ that.attemptTopicReport(); });

        $('#btn-topic-suggest').click(function(){ that.attemptTopicSuggest(); });
    
// Account settings
        $('#btn-settings').click(function(){ that.attemptSettings(); });

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// confirm account deletion //
	$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});

// handle account deletion //
	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });

        this.attemptHome = function()
        {
            window.location.href = '/home';

        };

        this.attemptWeekReport = function()
        {
            window.location.href = '/report';

        };

        this.attemptUserReport = function()
        {
            window.location.href = '/userreport';
        };

        this.attemptTagReport = function()
        {
            window.location.href = '/tag';
        };

       this.attemptTopicReport = function()
        {
            window.location.href = '/topicreport';
        };

       this.attemptTopicSuggest = function()
        {
            window.location.href = '/topiclist';
        };
        
        this.attemptMonthReport = function()
        {
	    window.location.href = '/monthreport';
        };
	this.deleteAccount = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete',
			type: 'POST',
			data: { id: $('#userId').val()},
			success: function(data){
	 			that.showLockedAlert('Your account has been deleted.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/home",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

        this.attemptSettings = function()
	{
		var that = this;
		$.ajax({
			url: "/settings",
			type: "GET",
			success: function(data){
			        window.location.href = '/settings'
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);
	}
}

HomeController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been updated.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
