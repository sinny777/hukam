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

var socialModule = angular.module('socialModule', ['angularjs-facebook-sdk'])
    .config(function facebookConfig(facebookConfigProvider) {
        facebookConfigProvider.setAppId(386453688053230);
        facebookConfigProvider.setLanguage('en-US');
        facebookConfigProvider.setOptions({ status: false, channelUrl: '/../js/app/fbChannel.htm' });
        facebookConfigProvider.setDebug(false);
//        facebookConfigProvider.setChannelUrl('/../js/app/fbChannel.htm'); 

        // When autoInit is setted to false you need to initialize
        // the facebookConfig service manually inside a run block.
        facebookConfigProvider.autoInit(false);

    }).run(function ($rootScope, facebookConfig, facebookService) {
    	
    	 facebookConfig.init().then(function(){
 	        console.log('Facebook SDK is loaded.');
 	        $rootScope.fbReady = true;
 	      });
    	
        facebookService.ready.then(function () {
            console.log('FacebookService is ready!');
            
//            FB.XFBML.parse();
            
            var statusChangeHandler = function (response) {
                if (response.status === 'connected') {
                    facebookService.api('/me').then(function (response) {
                        console.log(response);
                    });
                }
            };

            facebookService.Event.subscribe('auth.statusChange', statusChangeHandler);
        });
    });

/*angular.module('socialModule', [])
    .config(function () {
    	 var fbScript = document.createElement('script'); addThis.type = 'text/javascript'; addThis.async = true;
    	 fbScript.src = '//connect.facebook.net/en_US/sdk.js';
		  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(fbScript);

    })
    .run(function ($window) {
    	$window.fbAsyncInit = function() {
    	    FB.init({ 
    	      appId: '{386453688053230}',
    	      status: true, 
    	      cookie: true, 
    	      xfbml: true,
    	      version: 'v2.3'
    	    });
    	};
    }).factory('facebookService', function($q) {
        return {
            getMyLastName: function() {
                var deferred = $q.defer();
                FB.api('/me', {
                    fields: 'last_name'
                }, function(response) {
                    if (!response || response.error) {
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                });
                return deferred.promise;
            }
        }
    });*/

return socialModule;

});
