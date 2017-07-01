define(function (require) {
    'use strict';

    var angular = require('angular'),
	config = require('config'),
	ngRoute = require('angularRoute'),
	ngStorage = require('angularLocalStorage'),
//	uiBootstrap = require('ui.bootstrap'),
    commonModule = angular.module('commonModule', ['ngRoute',
                                                   'ngAnimate',
                                                   'LocalStorageModule',
//                                                   'ui.bootstrap',
                                                   'app.config']);
    
    commonModule.factory('commonService', require('../common/services/commonService'));
    commonModule.factory('sharedService', require('../common/services/sharedService'));
    
    commonModule.factory('authService', require('../common/services/authService'));
    commonModule.factory('mqttService', require('../common/services/mqttService'));
    commonModule.factory('dataService', require('../common/services/dataService'));
    
    commonModule.controller('commonController', require('../common/controllers/commonController'));
    commonModule.controller('servicesController', require('../common/controllers/servicesController'));

    commonModule.directive('fileModel', require('../common/directives/fileModelDirective'));
    commonModule.directive('toggle', require('../common/directives/toggleDirective'));
    commonModule.directive('lazyLoad', require('../common/directives/lazyloadDirective'));
    
    commonModule.filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
          }
        }  
        ]).
        filter('unsafe', ['$sce', function($sce) {
          return function(val) {
          	return $sce.trustAsHtml(val);
            }
          }  
        ]);
    
    commonModule.config(['$routeProvider',
                         function($routeProvider) {
    	/*
		$routeProvider.
			when('/home', {
				templateUrl: 'modules/common/partials/common/home.htm',
				controller: 'commonController',
				controllerAs: 'vm',
				access: { requiredLogin: false }
			}).
			otherwise({
	            redirectTo: '/home'
	        });
		*/
    	
		$routeProvider.
		  when('/', {templateUrl: 'modules/common/partials/common/hbuddy.htm', controller: 'commonController'}).
		  when('/home', {templateUrl: 'modules/common/partials/common/hbuddy.htm', controller: 'commonController'}).
		  when('/contact', {templateUrl: 'modules/common/partials/common/contactUs.htm'}).
		  when('/services/internetOfThings', {templateUrl: 'modules/common/partials/services/internetOfThings.htm', controller: 'servicesController'}).
		  when('/services/applicationdevelopment', {templateUrl: 'modules/common/partials/services/applicationdevelopment.htm'}).
		  when('/services/cloudsolutions', {templateUrl: 'modules/common/partials/services/cloudsolutions.htm'}).
		  when('/services/bigdata', {templateUrl: 'modules/common/partials/services/bigdata.htm'}).
		  when('/services/soa', {templateUrl: 'modules/common/partials/services/soa.htm'}).
		  when('/services/livestreaming', {templateUrl: 'modules/common/partials/services/livestreaming.htm', controller: 'servicesController'}).
		  when('/services/radio', {templateUrl: 'modules/common/partials/services/radio.htm'}).
		  when('/services/eventmanagement', {templateUrl: 'modules/common/partials/services/eventmanagement.htm', controller: 'servicesController'}).
		  when('/services/photography', {templateUrl: 'modules/common/partials/services/photography.htm'}).
		  when('/services/decoration', {templateUrl: 'modules/common/partials/services/decoration.htm'}).
		  when('/services/entertainment', {templateUrl: 'modules/common/partials/services/entertainment.htm'}).
		  when('/services/catering', {templateUrl: 'modules/common/partials/services/catering.htm'}).
		  when('/taxi', {templateUrl: 'modules/common/partials/common/taxi.htm'}).
		  when('/youtube', {templateUrl: 'modules/common/partials/common/youtubeUpload.htm'}).
		  when('/aboutus', {templateUrl: 'modules/common/partials/common/aboutUs.htm'}).
		  when('/news', {templateUrl: 'modules/common/partials/common/news.htm'}).
		  when('/careers', {templateUrl: 'modules/common/partials/common/careers.htm'}).
		  when('/discussions', {templateUrl: 'modules/common/partials/common/discussions.htm'}).
		  when('/liveServices', {templateUrl: 'modules/common/partials/common/liveServices.htm'}).
		  when('/serviceproviders', {templateUrl: 'modules/common/partials/common/serviceprovider.htm'}).
		  when('/steps', {templateUrl: 'modules/common/partials/common/liveStreamingSteps.htm'}).
		  when('/privacy', {templateUrl: 'modules/common/partials/common/privacyPolicy.htm'}).
		  when('/comingsoon', {templateUrl: 'modules/common/partials/common/comingsoon.htm'}).
		  
	      otherwise({templateUrl: 'modules/common/partials/common/404.htm'});

    }]);
    

    return commonModule;

});
