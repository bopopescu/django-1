

var cost = new function() {

	$this = this;
	var element;

	this.set_element = function (selected_element) {
		element = $(selected_element);
		return this;
	}

	this.reset = function () {
		element.removeClass('state_1 state_2 state_3').html('');
	}

	this.getDay = function() {
		this.reset();
		var offset = new Date().getTimezoneOffset();
		$.getJSON('/proxy/getCost?period=day&offset='+offset, function(response) {
		  if (!response.sum) { response.sum = 0.00 };
			element.html('<div class="cost state_3"><div class="right week">'+global.lang["since"]+'</div><div class="left month">'+global.lang["this.month"]+'</div><div class="middle"><p>'+global.lang["today"]+'</p><span>'+global_settings.cur_prefix + response.sum +global_settings.cur_suffix+'</span></div><a class="show-settings" href="#"></a></div>');
		});
	}

	this.getCustom = function() {
		this.reset();

		if(typeof global_settings.cost_since == "undefined") {
			var date = new Date();
			date.setDate( date.getDate() );
		} else {
			var parts = global_settings.cost_since.match(/(\d+)/g);
			if (parts && parts.length == 3) {
				var date = new Date(parts[2], parts[1]-1, parts[0]); // months are 0-based
			} else {
				var date = new Date();
			}
		}
		date.setHours(0,0,0,0);

		var human_date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
		var time = date.getTime() / 1000;
		var current = new Date();
    var offset = current.getTimezoneOffset();
		$.getJSON('/proxy/getCost?period=custom&offset='+ offset +'&fromTime=' + (time + (-60 * offset)).toFixed(0) + '&toTime=' + (((current.getTime()) / 1000) + ( -60 * offset ) ).toFixed(0), function(response) {
		  if (!response.sum) { response.sum = 0.00 };
			element.html('<div class="cost state_2"><div class="left today">'+global.lang["today"]+'</div><div class="right month">'+global.lang["this.month"]+'</div><div class="middle"><p style="margin-top: -8px; line-height: 14px;">'+global.lang["since"]+'<br />' + human_date + '</p><span>'+global_settings.cur_prefix + response.sum +global_settings.cur_suffix+ '</span></div><a class="show-settings" href="#"></a></div>');
		});
	}

	this.getMonth = function() {
	  var offset = new Date().getTimezoneOffset();
		this.reset();
		$.getJSON('/proxy/getCost?period=month&offset='+offset, function(response) {
		  if (!response.sum) { response.sum = 0.00 };
			element.html('<div class="cost state_1"><div class="left week">'+global.lang["since"]+'</div><div class="right today">'+global.lang["today"]+'</div><div class="middle"><p>'+global.lang["this.month"]+'</p><span>'+global_settings.cur_prefix + response.sum +global_settings.cur_suffix+'</span></div><a class="show-settings" href="#"></a></div>');
		});
	}

	this.display_settings = function () {

		if(typeof global_settings.cost_since == 'undefined') {
			var date = new Date();
		} else {
			var parts = global_settings.cost_since.match(/(\d+)/g);
			if (parts && parts.length == 3) {
				var date = new Date(parts[2], parts[1]-1, parts[0]); // months are 0-based
			} else {
				var date = new Date();
			}
		}

		var human_date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

    if(global_settings['display'] == 'demo') {
		  element.html('<div class="budget-settings">'+
					'<div class="since"><span class="label">'+global.lang["since"]+'</span> <input type="text" value="' + human_date + '" class="cost-since" /><br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (dd-mm-yy)</div>'+

					'<a href="#" class="save">'+global.lang["close"]+'</a> ' +
					'<a href="#" class="close">'+global.lang["close"]+'</a> ' +
					'</div><p style="width:232px; text-align:center;">'+global.lang["save.settings.disabled.in.demo"]+'</p>').hide().fadeIn();


		  element.find('.close').click(this.exit_settings);
		  element.find('.save').click(this.exit_settings);
		} else {
		  element.html('<div class="budget-settings">'+
					'<div class="since"><span class="label">'+global.lang["since"]+'</span> <input type="text" value="' + human_date + '" class="cost-since" /><br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (dd-mm-yy)</div>'+

					'<a href="#" class="save">'+global.lang["save"]+'</a> ' +
					'<a href="#" class="close">'+global.lang["close"]+'</a> ' +
					'</div>').hide().fadeIn();


		  element.find('.close').click(this.exit_settings);
		  element.find('.save').click(this.set_values);
		}

		//this.get_values();
	}


	this.set_values = function (e) {
		e.preventDefault();

		$(this).text(global.lang['saving.settings']);

		var since = element.find('.cost-since').val();
		var parts = since.match(/(\d+)/g);
		if (parts && parts.length == 3) {
			var date = new Date(parts[2], parts[1]-1, parts[0]); // months are 0-based
		} else {
			var date = new Date();
		}
		var human_date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

		$.getJSON('/kvs/set_kv?cost_since=' + encodeURIComponent(human_date), function(response) {
			for(var key in response){
        global_settings[key] = response[key];
      }
			$this.exit_settings(e);
		});

		return this;

	}

	this.exit_settings = function (e) {
		e.preventDefault();
		element.fadeOut('default', function() {
			$this.getCustom();
			element.fadeIn();
		});
	}

	$('body').on('click', '.cost .left, .cost .right', function(){
		alert("jkfdhdjk");
		if($(this).hasClass('today')) {	$this.getDay(); }
		if($(this).hasClass('week')) { $this.getCustom(); }
		if($(this).hasClass('month')) { $this.getMonth(); }
	});

	$('body').on('click', '.cost .show-settings', function(e){
		e.preventDefault();
		$this.display_settings();
	});
}
