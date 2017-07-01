/*global define, require */

define(['app'], function (app) {
    'use strict';

    app.config(['$routeProvider','$locationProvider', '$httpProvider', 'LoopBackResourceProvider','CONFIG',
                    function($routeProvider, $locationProvider, $httpProvider, LoopBackResourceProvider, CONFIG) {

                	$locationProvider.html5Mode(false);
                    $locationProvider.hashPrefix('!');

                 // Use a custom auth header instead of the default 'Authorization'
                    LoopBackResourceProvider.setAuthHeader('X-Access-Token');
                 
                    // Change the URL where to access the LoopBack REST API server
                    LoopBackResourceProvider.setUrlBase(CONFIG.API_URL);
                    
                    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
                    	  return {
                    	    responseError: function(rejection) {
                    	      if (rejection.status == 401) {
                    	        //Now clearing the loopback values from client browser for safe logout...
                    	        LoopBackAuth.clearUser();
                    	        LoopBackAuth.clearStorage();
                    	        $location.nextAfterLogin = $location.path();
                    	        $location.path('/home');
                    	      }
                    	      return $q.reject(rejection);
                    	    }
                    	  };
                    	});

                    $httpProvider.defaults.useXDomain = true;
                    delete $httpProvider.defaults.headers.common["X-Requested-With"];
//                    $httpProvider.defaults.headers.common["Accept"] = "application/json";
//                    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
//                    $httpProvider.defaults.headers.post['Content-Type'] = 'multipart/form-data; charset=utf-8';
                    $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

                        $routeProvider.
                            otherwise({
                                redirectTo: '/home'
                            });
                    }

     ]);


});
