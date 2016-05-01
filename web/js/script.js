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

    if ($('div.stats-tabs').length) {
      var domains = [];
      $.get(apiPath, params, function(data) {
        data.forEach(function(element) {
          var slug = element.replace('.', '');
          $('ul.tabs').append('<li class="tab col s3"><a href="#'+slug+'">'+element+'</a></li>');
          $('div.stats-tabs').append('<div id="'+slug+'" class="col s12"></div>');
          $('ul.tabs').tabs();
          domains.push(element);

          $.get(config.apiDomain + '/api/v1/url/' + element, function(data) {
            var table = '<table><thead><tr><th data-field="short">Short URL</th><th data-field="target">Target URL</th><th data-field="stats" class="center-align">Stats <br /><small>today | 7 days | 30 days | alltime</small></th><th data-field="date">Created at</th></tr></thead>';
            table = table + '<tbody>';

            data.forEach(function(s) {
              var stats = s.stats.hits_today + " | " + s.stats.hits_7days + " | " + s.stats.hits_30days + " | " + s.stats.hits_all;
              table = table + '<tr><td>'+s.shortUrl+'</td><td class="truncate table-target-url"><a href="'+s.targetUrl+'">'+s.targetUrl+'</a></td><td class="center-align">'+stats+'</td><td>'+new Date(s.timestamp * 1000).toDateString()+'</td></tr>'
            });

            table = table + '</tbody></table>';
            $('#'+slug).append(table);
          });
        });

      });


      

    } else {
      $.get(apiPath, params, function(data) {
        data.forEach(function(element) {
          $('select#domain').append('<option value="'+element+'">'+element+'</option>')
        });
      });
    }

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