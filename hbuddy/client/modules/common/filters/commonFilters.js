/*******************************************************************************
 *
 *  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER. 
 *  Copyright (c) 2015 GransLive
 *  All Rights Reserved. All content is proprietary and confidential.
 *
 *******************************************************************************/
gransliveApp.filter('truncate', function(){
        return function (text, length, end) {
        	
        	if (text == null || text.length == 0)
                return null;
        	
            if (isNaN(length))
                length = 25;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else { 
                return String(text).substring(0, length-end.length) + end;
            }

        };
    });

gransliveApp.filter('unsafe', function($sce) {
	    return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	});
