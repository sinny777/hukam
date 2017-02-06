/*******************************************************************************
 *
 *  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER. 
 *  Copyright (c) 2015 GransLive
 *  All Rights Reserved. All content is proprietary and confidential.
 *
 *******************************************************************************/

gransliveApp.directive('showSensorsData', function(commonService, $rootScope, iotService){
	
	return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {
        	'widgetId':'@',
			'currentUser':'=',
			'placeId':'@'
		},
        link: function (scope, element, attrs) {
        	
    		scope.randomString = function(len, charSet) {
			    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			    var randomString = '';
			    for (var i = 0; i < len; i++) {
			    	var randomPoz = Math.floor(Math.random() * charSet.length);
			    	randomString += charSet.substring(randomPoz,randomPoz+1);
			    }
			    return randomString;
			}
        	
    		var randomValue = scope.randomString(5);

    		if(!attrs.widgetId){
				attrs.$set('widgetId',randomValue);
			}
    		
    		var user = scope.currentUser;
    		
    		scope.$watch("placeId", function(newValue, oldValue, srcScope) {
    			console.log("scope.placeId: " +scope.placeId);
    			console.log("placeId newValue: >>> "+newValue);
    			if (commonService.isNullOrEmpty(scope.placeId) || commonService.isNullOrEmpty(scope.placeId)) {
    			    return;
    			 }
    			
    			if(scope.selectedAttachment && scope.selectedAttachment.childId){
    				scope.unsubscribeFromMQTT(scope.selectedAttachment.childId);
    			}
    			/*scope.usage.showType = 'range';
    			scope.chartShowTypeChanged('range');*/
    			scope.attachments = [];
    			scope.selectedAttachment = {};
    			iotService.getAttachments(scope.placeId).then(function(response) {
                    if(!commonService.isNullOrEmpty(response.items) && response.items.length > 0){
                    	scope.attachments = response.items;
                    	console.log(scope.attachments);                        	
                    	if(scope.attachments.length == 1){
                    		scope.selectedAttachment = scope.attachments[0];
                    		if(scope.usage.showType == 'range'){
                    			scope.fetchUsage(scope.selectedAttachment);
                    		}else{
                    			scope.chartShowTypeChanged('realTime');
                    		}
                    	}   
                    }
                },
                function(error) {
                    console.log('ERROR IN FETCHING ATTACHMENTS : >>>>>> ' +JSON.stringify(error));
                });
    		
    		});
        },
        controller: 'sensorsController',
        templateUrl: '/../page/secure/sensorsData.htm'
    }
	
});


