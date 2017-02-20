define(function (require) {
    'use strict';

    var angular = require('angular'),
	config = require('config'),
	ngRoute = require('angularRoute'),
	ngStorage = require('angularLocalStorage'),
//	uiBootstrap = require('ui.bootstrap'),
    iotModule = angular.module('iotModule', ['ngRoute',
                                                   'ngAnimate',
                                                   'LocalStorageModule',
//                                                   'ui.bootstrap',
                                                   'app.config']);
    
    iotModule.factory('authService', require('../common/services/authService'));
    iotModule.factory('dataService', require('../common/services/dataService'));
    iotModule.factory('mqttService', require('../common/services/mqttService'));
    iotModule.factory('iotService', require('../iot/services/iotService'));
    
    iotModule.controller('placeController', require('../iot/controllers/placeController'));
    iotModule.controller('groupsController', require('../iot/controllers/groupsController'));
    iotModule.controller('scenesController', require('../iot/controllers/scenesController'));
    iotModule.controller('productsController', require('../iot/controllers/productsController'));
    
    iotModule.directive('fileModel', require('../common/directives/fileModelDirective'));
    iotModule.directive('toggle', require('../common/directives/toggleDirective'));
    iotModule.directive('groupsDirective', require('../iot/directives/groupsDirective'));
    iotModule.directive('scenesDirective', require('../iot/directives/scenesDirective'));
    
    iotModule.filter('interpolate', ['version', function(version) {
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
    
    iotModule.config(['$routeProvider',
                         function($routeProvider) {
		$routeProvider.
			when('/places', {
	            templateUrl: 'modules/iot/partials/places.html',
	            controller: 'placeController',
	            controllerAs: 'vm',
	            access: { requiredLogin: true }
	        }).
	        when('/admin/products', {
	            templateUrl: 'modules/iot/partials/admin/products.html',
	            controller: 'productsController',
	            controllerAs: 'vm',
	            access: { requiredLogin: true }
	        }).
	        otherwise({
	            redirectTo: '/home'
	        });
	}]);

    return iotModule;

});
