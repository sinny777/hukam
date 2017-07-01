/*******************************************************************************
 *
 *  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER. 
 *  Copyright (c) 2015 GransLive
 *  All Rights Reserved. All content is proprietary and confidential.
 *
 *******************************************************************************/

commonModule.directive('displayMedia', function(commonService, $rootScope, eventService, youtubeService, sharedService){
	
	return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {
        	'widgetId':'@',
			'currentUser':'=',
			'title':'@',
			'searchBox': '@',
			'showType':'@',
			'mediaSearch':'='
		},
        link: function (scope, element, attrs) {
        	
        	scope.media = {};
        	scope.media.title = attrs.title;
	        scope.media.videos = [];
	        
	        if(!attrs.visible){
	        	scope.media.visible = true;
			}else{
				scope.media.visible = attrs.visible;
			}
	        
	        if(!attrs.showType){
	        	scope.media.showType = 'overlay';
			}else{
				scope.media.showType = attrs.showType;
			}
    		
    		if(!attrs.searchBox){
    			scope.media.searchBox = 'false';
			}else{
				scope.media.searchBox = attrs.searchBox;
			}
	        
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
    		if(user){
    			scope.mediaSearch.userId = user.id;
    		}
    		
    		scope.$watch("mediaSearch", function(newValue, oldValue, srcScope) {
    			if (commonService.isNullOrEmpty(scope.mediaSearch) || commonService.isNullOrEmpty(scope.mediaSearch.part)) {
    			    return;
    			 }
    			
    			eventService.searchEvents(scope.mediaSearch, sharedService.config.directFromYoutube).then(function(resp){
    				console.log('<<<<<<<<<<< MEDIA SEARCH COMPLETED >>>>>>>>>>: ' +sharedService.config.directFromYoutube);
                    console.log(resp);
                   	 if(resp.code == 400){
                   		 scope.media.visible = true;
                            return;
                        }
                   	 if(resp.kind == 'youtube#searchListResponse'){
                   		angular.forEach(resp.items, function(result) {
       	            	 var imageUrl = "//storage.googleapis.com/granslive_store/assets/icon.png";
       	            	if (result.snippet.thumbnails.high != null
       							&& !result.snippet.thumbnails.high.url != null) {
       						imageUrl = result.snippet.thumbnails.high.url;
       					} 
       	            	
       	            	/*if(result.id.videoId == 'Djf9ynUOnQA'){
       	            		continue;
       	            	}*/
       	            	   var videoData = {
       	            			type: 'video',
       		                    title: result.snippet.title,
//       		                    description: $sce.trustAsHtml(result.snippet.description),
       		                    channelId: result.snippet.channelId,
       		                    channelTitle: result.snippet.channelTitle,
       		                    description: result.snippet.description,
       		                    createdAt: result.snippet.publishedAt,
       		                    imagePath: imageUrl,
       		                    id: result.id.videoId,
//       		                    href: constants.YOUTUBE_VIDEO_PAGE_URL_PREFIX + result.id.videoId,
       		                    statistics: result.statistics,
//       		                    sources: [{thirdPartySource: constants.YOUTUBE_VIDEO_PAGE_URL_PREFIX + result.id}]
       	                	};
       	            	   
       	            	scope.media.videos.push(videoData);
       	              });
                   	 }else{
                   		 scope.media.videos = resp.items;
                   	 }
                   	 
                   	 if(!scope.media.videos){
                   		 return;
                   	 }
                   	 
                   	 if(scope.media.videos.length > 0){
                   		 scope.media.visible = true;
                   	 }
                   	 
       	             if(scope.media.showType == 'overlay'){
          					setTimeout(function(){
              					commonService.handleCarousel("#"+attrs.widgetId, "#"+attrs.widgetId+"-next","#"+attrs.widgetId+"-prev");
       	        				commonService.imgHoverlay();
              				}, 1);
          				  }
                    });
    		});
        },
        controller: 'eventsController',
        templateUrl: '/../page/common/medias.htm',
    }
	
});
