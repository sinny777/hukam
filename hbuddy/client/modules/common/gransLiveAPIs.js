/*******************************************************************************
 *
 *  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER. 
 *  Copyright (c) 2015 GransLive
 *  All Rights Reserved. All content is proprietary and confidential.
 *
 *******************************************************************************/

define(function (require) {
    'use strict';

    var angular = require('angular');

var gransLiveAPIs = angular.module('gransLiveAPIs', [ 'LocalStorageModule' ]);

// Run
gransLiveAPIs.run(function() {
	var tag = document.createElement('script');
	tag.src = "//apis.google.com/js/client.js?onload=load";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

// Config
gransLiveAPIs.config(function($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

// factory
gransLiveAPIs.factory('cloudendpoint', function ($q) {
    return {
        init:function() {
        	var DEFAULT_ROOT = 'https://granslive.appspot.com/_ah/api';
        	var ACCOUNTS_ROOT = 'https://accounts-dot-granslive.appspot.com/_ah/api';
        	var STREAMING_ROOT = 'https://streaming-dot-granslive.appspot.com/_ah/api';
        	var IOT_ROOT = 'https://iot-dot-granslive.appspot.com/_ah/api';
        	var SHOP_ROOT = 'https://shop-dot-granslive.appspot.com/_ah/api';
            var commondefer = $q.defer();
            var accountdefer = $q.defer();
//            var featuredefer=$q.defer();
            var channeldefer = $q.defer();
            var eventdefer = $q.defer();
            var iotdefer = $q.defer();
            var shopdefer = $q.defer();
            var oauthloaddefer = $q.defer();
            var oauthdefer = $q.defer();
            
            gapi.client.load('common', 'v1', function() {
            	commondefer.resolve(gapi);
            }, DEFAULT_ROOT);
            
           /* gapi.client.load('feature', 'v1', function() {
            	featuredefer.resolve(gapi);
            }, DEFAULT_ROOT);*/
            gapi.client.load('account', 'v1', function() {
            	accountdefer.resolve(gapi);
            }, ACCOUNTS_ROOT);
            gapi.client.load('channel', 'v1', function() {
            	channeldefer.resolve(gapi);
            }, STREAMING_ROOT);
            gapi.client.load('event', 'v1', function() {
            	eventdefer.resolve(gapi);
            }, STREAMING_ROOT);
            gapi.client.load('iot', 'v1', function() {
            	iotdefer.resolve(gapi);
            }, IOT_ROOT);
            gapi.client.load('shop', 'v1', function() {
            	shopdefer.resolve(gapi);
            }, SHOP_ROOT);
            gapi.client.load('oauth2', 'v2', function(){
                oauthloaddefer.resolve(gapi);
            });
            var chain=$q.all([commondefer.promise,accountdefer.promise,channeldefer.promise,eventdefer.promise,iotdefer.promise,shopdefer.promise,oauthloaddefer.promise]);
            return chain;
        },
    	doCall: function(callback) {
		    var p=$q.defer();
            gapi.auth.authorize({client_id: '209046335886-91uk1oop7qaieonhh2ei3uieafbpda2n.apps.googleusercontent.com', scope: 'https://www.googleapis.com/auth/userinfo.email',
            immediate: true}, function(){
                var request = gapi.client.oauth2.userinfo.get().execute(function(resp) {
                	console.log('ALL DONE >>>>>>>>>>>>>>> ' +resp.code);
                	console.log(resp);
                if (!resp.code) {
                    p.resolve(gapi);
                } else {
                    p.reject(gapi);
                }
                });
            });
			return p.promise;
    	},
        signin:function(callback) {
            gapi.auth.authorize({client_id: '209046335886-91uk1oop7qaieonhh2ei3uieafbpda2n.apps.googleusercontent.com', scope: 'https://www.googleapis.com/auth/userinfo.email',
                    immediate: false}, callback);
        }
    }
});

// Service

/*gransLiveAPIs.service('gransLiveAPIService', [ '$window', '$rootScope', '$log',
		'localStorageService',
		function($window, $rootScope, $log, localStorageService) {

			var service = this;
			var results = [];

			$window.load = function() {
				console.log('Google API is ready');
				$rootScope.$apply(this.loadChannelAPI);
			};

			this.loadChannelAPI = function() {
				gapi.client.load('channel', 'v1', function() {
					$rootScope.channelAPILoaded = true;
					console.log('CHANNEL API LOADED SUCCESSFULLY >>>>>>>>>>>>');
					this.loadChannels();
				  }, 'https://streaming-dot-granslive.appspot.com/_ah/api');
			};
			
			this.loadEventAPI = function() {
				gapi.client.load('event', 'v1', function() {
					$rootScope.eventAPILoaded = true;
					console.log('EVENT API LOADED SUCCESSFULLY >>>>>>>>>>>>');
				  }, 'https://streaming-dot-granslive.appspot.com/_ah/api');
			}
			
			this.loadChannels = function() {
				console.log('IN LOAD CHANNELS >>>>>>>>>>>>> ');
				var request = gapi.client.channel.list({
					limit : 25
				});

				request.execute(function(resp) {
					console.log(resp);
				});

				$rootScope.$apply();
			};

 }]);

gransLiveAPIs.controller('GransLiveAPIsController', function ($scope, $http, $log, gransLiveAPIService) {
	init();
	
	function init() {
	      $scope.loadChannelAPI = gransLiveAPIService.loadChannelAPI();
	    }
	
});*/

return gransLiveAPIs;

});
