
define(['angular'], function (angular) {
    "use strict";

  var factory = function (CONFIG, $http) {

	  var Data = {};

	  /**
	   * Returns a url to be used for authentication.
	   */
	  Data.getValue = function(key, callback) {
		  var req = {
	    			 method: 'GET',
	    			 url: '/assets/resources/data.json',
	    			 headers: {
	    			   'Accept': 'application/json'
	    			 } 
	    			}

			$http(req).then(function(jsonResp){
				if(callback){
					callback(jsonResp.data[key]);
				}
			}, function(err){
				console.log(err);
			});
	  };

	  return Data;
	
  }

	factory.$inject = ['CONFIG', '$http'];
	return factory;
});

