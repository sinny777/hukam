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

var googleAPIModule = angular.module('googleAPIModule', ['ng']);

//Run
googleAPIModule.run(function() {
	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

googleAPIModule.factory('constants', function() {
  return {
    IFRAME_API_URL: '//www.youtube.com/iframe_api',
    GOOGLE_APIS_CLIENT_URL: 'https://apis.google.com/js/client.js?onload=',
    GOOGLE_APIS_CLIENT_CALLBACK: 'onClientLoad',
    OAUTH2_CLIENT_ID: '209046335886-91uk1oop7qaieonhh2ei3uieafbpda2n.apps.googleusercontent.com',
    OAUTH2_SCOPES: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/youtube.readonly https://www.google.com/calendar/feeds/',
    OAUTH2_REVOKE_URL: 'https://accounts.google.com/o/oauth2/revoke?token=',
    API_KEY: 'AIzaSyB0tJhR0eDOPqCCDOdn1Tt5BH-bCO2PMU8',
    FREEBASE_API_URL: 'https://www.googleapis.com/freebase/v1/search',
    YOUTUBE_API_SERVICE: 'youtube',
    YOUTUBE_API_VERSION: 'v3',
    FREEBASE_API_MAX_RESULTS: 30,
    FREEBASE_CACHE_MINUTES: 60,
    YOUTUBE_CACHE_MINUTES: 60,
    MIN_SCORE: 60,
    MAX_SCORE: 100,
    SCORE_NORMALIZATION_FACTOR: 35,
    YOUTUBE_API_MAX_RESULTS: 25,
    DEFAULT_PROFILE_THUMBNAIL: 'https://s.ytimg.com/yts/img/no_videos_140-vfl5AhOQY.png',
    VIDEO_KIND: 'youtube#video',
    CHANNEL_KIND: 'youtube#channel',
    PLAYLIST_KIND: 'youtube#playlist',
    YOUTUBE_VIDEO_PAGE_URL_PREFIX: 'https://www.youtube.com/watch?v=',
    YOUTUBE_CHANNEL_PAGE_URL_PREFIX: 'http://youtube.com/channel/',
    YOUTUBE_PLAYLIST_PAGE_URL_PREFIX: 'http://www.youtube.com/playlist?list=',
    DEFAULT_DISPLAY_NAME: 'Stranger',
	RECOMMENDATION_TYPE: 'recommendation',
	SOCIAL_TYPE: 'social'
  };
});

googleAPIModule.factory('youtube', function(constants) {
  function makeCacheKey(service, params) {
    return service + JSON.stringify(params);
  }

  return function(options) {
    options.path = [constants.YOUTUBE_API_SERVICE, constants.YOUTUBE_API_VERSION, options.service].join('/');

    var cacheKey = makeCacheKey(options.service, options.params);
//    var results = lscache.get(cacheKey);
    var results = null;

    if (options.method == 'GET' && results) {
      setTimeout(function() {
        options.callback(results)
      }, 1);
    } else {
      // gapi.client.request will "helpfully" try to invoke options.callback for us automatically...
      var callback = options.callback;
      delete options.callback;

      var cacheTimeout = constants.YOUTUBE_CACHE_MINUTES;
      if ('cacheTimeoutMinutes' in options) {
        cacheTimeout = options.cacheTimeoutMinutes;
      }

      var request = gapi.client.request(options);
      request.execute(function(results) {
        if (options.method == 'GET' && results && !('error' in results)) {
          lscache.set(cacheKey, results, cacheTimeout);
        }else{
        	if(results.error.code == 401){
        		console.log("In GoogleAPIModule, LOGIN REQUIRED >>>>>>>>>>> ");
        		lscache.flush();
        	}
        }

        callback(results);
      });
    }
  };
});

googleAPIModule.service('youtubePlayerService', ['$window', '$rootScope', '$log', function ($window, $rootScope, $log) {
    var service = $rootScope.$new(true);

    // Youtube callback when API is ready
    $window.onYouTubeIframeAPIReady = function () {
        console.log('Youtube Player API is ready >>>>>>>>>>>>>>>>>>>> ');
        service.ready = true;
    };

    service.ready = false;
    service.playerId = null;
    service.player = null;
    service.videoId = null;

    service.bindVideoPlayer = function (elementId) {
        $log.info('Binding to player ' + elementId);
        service.playerId = elementId;
    };

    service.createPlayer = function (elementId, options) {
        this.player = new YT.Player(elementId, {
	          playerVars: options.playerVars,
	          height: options.height,
	          width: options.width,
	          videoId: options.videoId 
	        });
        return this.player;
        
    };

    service.loadPlayer = function (elementId, options) {
        if (this.ready && elementId && options.videoId) {
            if(this.player) {
                this.player.destroy();
            }

            this.player = this.createPlayer(elementId, options);
        }
    };

    return service;
}]);

return googleAPIModule;

});

