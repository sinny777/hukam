
define(['angular'], function (angular) {
    "use strict";

    var directive = function () {
    	return {
    		restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {
            	'widgetId':'@',
    			'currentUser':'=',
    			'selectedPlace':'='
    		},
    	    link: function(scope, element, attrs){
    	      
    	    },
    	    controller: 'groupsController',
            templateUrl: '/modules/iot/partials/groups.html',
    	  }
    }
    
    directive.$inject = ['$parse'];
    return directive;
	
});

