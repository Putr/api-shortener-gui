(function($){
  $(function(){

  	//
  	// Materializecss
  	// 
    $('.button-collapse').sideNav();
  	
  	// 
  	// Get list of domains
  	// 
  	var apiPath = config.apiDomain + '/api/v1/domain'; 
  	params = {
  		access_code: config.accessCode,
  	};
  	$.get(apiPath, params, function(data) {
  		data.forEach(function(element) {
  			$('select#domain').append('<option value="'+element+'">'+element+'</option>')
  		});
  	});

  	//
  	// Form ADD submit handler
  	// 
    $('form#add-form').submit(function(event) {
    	var domain = $('select#domain').val();
    	var shortUrl = $('input#shortUrl').val();
    	var url = $('input#target_url').val();

		var params = {
			access_code: config.accessCode,
			shortUrl: shortUrl,
			target_url: url
		};
		shortendUrl = "http://" + domain + "/" + shortUrl;

		var apiPath = config.apiDomain + '/api/v1/url/' + domain; 
    	$.post( apiPath, params, function( data ) {
		  swal("Short Url Created", shortendUrl, "success")
		});

		document.getElementById("add-form").reset();

    	event.preventDefault();
    });

    //
  	// Form REMOVE submit handler
  	// 
    $('form#rem-form').submit(function(event) {
    	var domain = $('select#domain').val();
    	var shortUrl = $('input#shortUrl').val();
		var params = {
			access_code: config.accessCode,
		};
		shortendUrl = "http://" + domain + "/" + shortUrl;

		var apiPath = config.apiDomain + '/api/v1/url/' + domain + "/" + shortUrl; 
		$.ajax({
		    type: "DELETE",
		    dataType: "json",
		    data: params,
		    url: apiPath,
		    statusCode: {
		        200: function (data) {
		            swal("Short Url Deleted", shortendUrl, "success")
		        }
		    }, error: function (data) {
		    	console.log(data);
		        swal("Could not delete!", shortendUrl, "error")
		    }
		});

		document.getElementById("rem-form").reset();

    	event.preventDefault();
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space