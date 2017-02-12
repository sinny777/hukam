define([
	'angular',	
	'angularRoute',
	'angularResource',
    'angularAnimate',
    'angularLocalStorage',
    'angularToastr',
    'angularCookies',
    'angularFilesystem',
    'xeditable',
    'angularMoment',
    'angularGoogleAnalytics',
    'cryptojslib',
    'querystring',
    'mqtt',
    'greensock',
    'plugins',
    'themepunchPlugin',
    'themepunchRevolution',
    'layersliderTransitions',
    'jqueryLayerslider',
    'base64',
    'sprintf',
    'lscache',
    'spin',
    'custom',
	'../scripts/config',
	'../modules/loopback/lb-services',
	'../modules/common/angularjs-facebook',
	'../modules/common/angularjs-viewhead',
	'../modules/common/googleAPIsModule',
	'../modules/common/socialModule',
	'../modules/common/gransLiveAPIs',
	'../modules/common/directives/commonDirectives',
	'../modules/common/commonModule',
	'../modules/iot/iotModule',
	'../modules/watson/watsonModule'
], function (angular, angularRoute) {
    'use strict';

    var hukam =  angular.module('hukam', [
        'ngRoute',
        'ngResource',
        'ngAnimate',
        'LocalStorageModule',
        'toastr',
        'ngCookies',
        'xeditable',
        'angularMoment',
        'fileSystem',
        'app.config',
        'lbServices',
        'angularjs-facebook-sdk.config',
        'angular-google-analytics',
        'viewhead',
        'googleAPIModule',
        'socialModule',
        'gransLiveAPIs',
        'commonDirectives',
        'commonModule',
        'iotModule',
        'watsonModule'
    ]);
    
    
    hukam.config(function(toastrConfig, AnalyticsProvider) {
    	
    	AnalyticsProvider.setAccount({
    		  tracker: 'UA-91626049-1',
    		  name: "hbuddy-tracker1",
    		  fields: {
    		    cookieDomain: 'hbuddy.hukam.in',
    		    cookieName: 'hbuddy-hukam',
    		    cookieExpires: 20000
    		    // See: [Analytics Field Reference](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference) for a list of all fields.
    		  },
    		  displayFeatures: true,
    		  enhancedLinkAttribution: true,
    		  select: function (args) {
    		    // This function is used to qualify or disqualify an account object to be run with commands.
    		    // If the function does not exist, is not a function, or returns true then the account object will qualify.
    		    // If the function exists and returns false then the account object will be disqualified.
    		    // The 'args' parameter is the set of arguments (which contains the command name) that will be sent to Universal Analytics.
    		    return true;
    		  },
    		  trackEvent: true,
    		  trackEcommerce: true
    		});
    	
    });
    
    hukam.run(['$rootScope','$location', '$window', 'LoopBackAuth', 'editableOptions', function($rootScope, $location, $window, LoopBackAuth, editableOptions) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
             $rootScope.footerLinks = [];
             var currentUserId = LoopBackAuth.currentUserId;
             if (!LoopBackAuth.isLoggedIn() && !currentUserId) {
               console.log("USER IS NOT LOGGEDIN: >>> ", currentUserId);
//               $location.path("/#!/home");
//               event.preventDefault();
               if(!$rootScope.currentUser){
          		 $rootScope.currentUser = {permissions: {}};
	           }else{
	          		 console.log("$rootScope.currentUser: >>> ", $rootScope.currentUser);
	           }
             }else{
            	 console.log("USER IS LOGGEDIN: >>> ", currentUserId);
            	 if(!$rootScope.currentUser){
            		 $rootScope.currentUser = {permissions: {}};
            	 }
             }
             
             editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
             console.log("IN routeChangeStart, currentUser: >>> ", $rootScope.currentUser);

        });
        
        /*
        $rootScope.loadingScreen = $('<div style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:10000;background-color:gray;background-color:rgba(70,70,70,0.2);"><img style="position:absolute;top:50%;left:50%;" alt="" src="//storage.googleapis.com/hukam-cdn/public/images/loading.gif" /></div>')
        .appendTo($('body')).hide();
        */
        
        $rootScope.loginLable = 'Login';
    	$rootScope.fbReady = false;
    	$rootScope.isLogin = false;
    	$rootScope.currentUser = {'imagePath':'/hukam-cdn/public/images/icons/avatar.png'};
    	$rootScope.plan = {};
    	$rootScope.showCalculator = false;
    	$rootScope.showPlans = true;
    	$rootScope.pageContent = {};
    	$rootScope.authResult = {};
    	$rootScope.endpointsReady = false;
    	
    	$rootScope.loadingScreen = $('<div style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:10000;background-color:gray;background-color:rgba(70,70,70,0.2);"><img style="position:absolute;top:50%;left:50%;" alt="" src="//storage.googleapis.com/hukam-cdn/public/images/loading.gif" /></div>')
        .appendTo($('body')).hide();
    	
    	 $rootScope.$on('$locationChangeStart', function() {
            $rootScope.previousPage = location.pathname;
        });
    	 
    	 /*
    	 AWS.config.update({
    		    accessKeyId: "AKIAIDNMWBSCQIADC7DA",
    		    secretAccessKey: "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",
    		    "region": "ap-southeast-1" 
    		});
    	
    	 
    	 $window.fbAsyncInit = function() {
    		 FB.init({ 
    		      appId: '676775262334675', 
    		      channelUrl: '/../js/app/fbChannel.htm', 
    		      status: true, 
    		      cookie: true, 
    		      xfbml: true ,
    		      version: 'v2.3'
    		    });
    		    
    		    $rootScope.fbReady = true;

    		  };

    		  (function(d){

    		    var js, 
    		    id = 'facebook-jssdk', 
    		    ref = d.getElementsByTagName('script')[0];

    		    if (d.getElementById(id)) {
    		      return;
    		    }

    		    js = d.createElement('script'); 
    		    js.id = id; 
    		    js.async = true;
    		    js.src = "//connect.facebook.net/en_US/sdk.js";

    		    ref.parentNode.insertBefore(js, ref);

    		  }(document));
        */

    }]);
     
    
    return hukam;


});
