define(function () {
    'use strict';
    
    function init() {
     	window.load(); // Calls the init function defined on the window
    }

  function ctrl($scope, $rootScope, $routeParams, $location, $anchorScroll, $sce, $http, $window, commonService, sharedService, cloudendpoint, authService){
	  
	  	$rootScope.loginCredentials = {};
	  	$rootScope.googleAPILoaded = false;
		$rootScope.showRadio = false;
		$rootScope.showNavBar = false;
		$rootScope.messages = [];
//		$rootScope.videoData = null;
//		$rootScope.videoId = null;
		$rootScope.playlist = null;
		$rootScope.showPlaylists = false;
		$rootScope.share = {};
		$rootScope.previousPage = '';
		$rootScope.actions = {fetchingFromGoogle: false, fetchingUserFromGransLive: false};
		
		$rootScope.playerConfig = {width: 864, height: 483, resize : true };
		
		var channel = null;
		var socket = null;
		$rootScope.width = window.innerWidth * 70 /100;
		$rootScope.height = '2100px';
		
		$rootScope.$on('$viewContentLoaded ', function(){
			console.log('COMMON CONTROLLER LOADED - >>>>>>>>>');
		});
		
		$rootScope.$on('CurrentUserUpdated ', function(){
			console.log("IN CurrentUserUpdated: >>> ", $rootScope.currentUser);
//			$rootScope.currentUser = sharedService.currentUser;
		});
		
		$scope.$on('$locationChangeSuccess',function(evt, absNewUrl, absOldUrl) {
		   console.log('success >>>>>>>>>>>>>>>>>>>>>>>>>> ' +absOldUrl);
		   $rootScope.previousPage = absOldUrl;
		   
		   $rootScope.checkUser(function(userObj){
			   console.log("Logged In User: >>>> ", userObj);
			   if($rootScope.currentUser && $rootScope.currentUser.profile){
		      		  if($rootScope.currentUser.profile.email == 'sinny777@gmail.com' ||
		      				  $rootScope.currentUser.profile.username == 'sinny777'){
		      			$rootScope.currentUser.role = 'admin';
		      		  }else{
		      			$rootScope.currentUser.role = 'guest';
		      		  }
			   }
		   });
		   
		});
		
		$window.load = function() {
	  		console.log("<<<<<<<<<< IN window.load >>>>>>>>>>>>>>>>>>.")
	  		$scope.$apply($rootScope.initgapi);
	  		pageLoadCompleted();
	  	};
		
		$scope.$on('$locationChangeStart', function (e, next, previous) {
			if(next != previous){
				console.log('Location changed from : >>>>>>>>>>>>>> ' +previous);
				$rootScope.oldUrl = previous;
				$rootScope.oldHash = $window.location.hash;
			}
	    });
	  

    $rootScope.initNavBar = function(){
    	console.log("\n\n<<<<<<<< IN commonController.initNavBar >>>>>>>>>> ");
    };
	  
    $rootScope.checkUser = function(callback){
    	$rootScope.loadingScreen.show();
    	if(!$rootScope.currentUser || !$rootScope.currentUser.id){
    		authService.ensureCurrentUser(function(currentUser){
    			$rootScope.loadingScreen.hide();
    			$rootScope.currentUser = currentUser;
    			
    			if($rootScope.currentUser && $rootScope.currentUser.profile && !$rootScope.currentUser.profile.username){
    				$rootScope.currentUser.profile.username = $rootScope.currentUser.username;
    			}
    			
    			if(callback){
    				callback($rootScope.currentUser);
    			}
    		});
    	}else{
    		$rootScope.loadingScreen.hide();
    		if(callback){
				callback($rootScope.currentUser);
			}
    	}
    };

    $rootScope.login = function(){
    	authService.login($rootScope.loginCredentials, function(userObj){
    		$rootScope.currentUser = userObj;
    		console.log('USER OBJ AFTER LOGIN: $rootScope.currentUser >>>>>> ', $rootScope.currentUser);
    		$("[data-dismiss=modal]").trigger({ type: "click" });
    		
    		if($rootScope.currentUser && $rootScope.currentUser.profile){
	      		  if($rootScope.currentUser.profile.email == 'sinny777@gmail.com' ||
	      				  $rootScope.currentUser.profile.username == 'sinny777'){
	      			$rootScope.currentUser.role = 'admin';
	      		  }else{
	      			$rootScope.currentUser.role = 'guest';
	      		  }
		   }
    		
    	});
      };  
	    
    $rootScope.logout = function(){
    	console.log("IN LOGOUT Call for: ", $rootScope.currentUser); 
    	authService.logout(function(){
    		$rootScope.currentUser = {};
    		$location.path("/#!/home");
    	});
    	/*
    	setTimeout(function () {
            $scope.$apply(function () {
            	$rootScope.currentUser = {};
            });
        }, 1000);
        */
      };
      
    $rootScope.loginRequired = function(){
  		$location.path('/');
  	};
  	
  	$rootScope.goBack = function(){
//  		history.back();
  		$location.path($rootScope.previousPage);
  	};
  	
  	$rootScope.reloadPage = function(){
  		console.log('refresh required >>>>');
//  		$window.location.reload();
  	};
  	
  	$rootScope.initgapi=function() {
  		console.log("$rootScope.endpointsReady: >>> " +$rootScope.endpointsReady)
  		if(!$rootScope.endpointsReady){
  			console.log("<<<<<<<<<< IN initgapi >>>>>>>>>>>>>>>>>>.")
  			cloudendpoint.init().then(function(){
  				console.log('Hukam Services Initialized ');
  				$rootScope.endpointsReady = true;
  			},function(){alert('Not Initialized')});
  		}
  	};
  	
  	$rootScope.setContent = function(){
  		$rootScope.pageContent = sharedService.basicContent;
  		$rootScope.gotoTop();
  	}
  	
  	$rootScope.setContactUs = function(){
  		$rootScope.pageContent = sharedService.basicContent;
  		/*var mapOptions = {
  		        zoom: 14,
  		        center: new google.maps.LatLng(31.3260, 75.5760),
  		        mapTypeId: google.maps.MapTypeId.TERRAIN
  		    }
  		setTimeout(function(){
  			$scope.map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
  		}, 1);*/
  		
  		$rootScope.gotoTop();
  	}
  	
  	$rootScope.gotoTop = function (){
  	  $('body,html').animate({scrollTop:0},400);
  	  /*$location.hash('wrapper');
  	  $anchorScroll();*/
  	};
  	
  	$rootScope.imageIfError = function(imgPath){
  		console.log('IN imageIfError >>>>>>>>>>>>>>' +imgPath)
  		$http.get(imgPath).
  		  success(function(data, status, headers, config) {
  			  console.log('SUCCESS >>>>>>>>>>>>>>')
  		   return imgPath;
  		  }).
  		  error(function(data, status, headers, config) {
  			  console.log('ERROR >>>>>>>>>>>>>>')
  		   return 'http://www.granslive.com/images/granslive-logo.png'; 
  		  });
  	};
  	
  	$rootScope.scrollTo = function(id) {
  	     $location.hash(id);
  	     $anchorScroll();
  	  };
  	
  	$rootScope.location = function() {
  	     var location = $location.url();
  	     console.log(location);
  	     return location;
  	  };
  	
  	$rootScope.getLocation = function(){
  	      return document.location.href; 
  	 };
  	 
  	 $rootScope.setSharingData = function(){
  	      $rootScope.share.location = document.location.href; 
  	 };  
  	
  	$rootScope.searchFor = function (searchTerm){
  		$rootScope.searchTerm = searchTerm;
  		$rootScope.videoId = null;
  		$rootScope.videoData = null;
//  		$location.search('searchTerm',searchTerm).path('/videos');
  		console.log('IN CommonController.searchFor: ' +searchTerm);
//  		$rootScope.searchChannelAndVideos(searchTerm);
  		$location.path('/videos');
  	};
  	
  	$rootScope.hasAccess = function(roleTitle){
  		var result = false;
  		angular.forEach(sharedService.currentUser.roles, function(role, key) {
  	        if(role.title == roleTitle){
  	        	result = true;
  	        }
  	    });
  		
  		if(!result && sharedService.currentUser.emailId == 'sinny777@gmail.com'){
  			result = true;
  		}
  		
  		return result;
  	}
  	
  	$rootScope.initEncoder = function(){
  		$rootScope.selectedEncoder = 'fmle';
  	}
  	
  	$rootScope.renderHtml = function(text) {
  		console.log(text);
          return $sce.trustAsHtml(text);
//  		  return $sanitize(text);
      };
      
      $rootScope.handleAdsSlider = function(){
      	var config = {width: '290', height: '300'};
      		setTimeout(function(){
  				commonService.handleSlider(config);
      		}, 1);
      };
      
      $rootScope.showStreamingSlider = function(){
        	var config = {width: '1020', height: '500'};
        		setTimeout(function(){
    				commonService.handleSlider(config);
    			}, 3);
        };
      
      $rootScope.showHBuddySlider = function(){
      	var config = {width: '1020', height: '500'};
      		setTimeout(function(){
  				commonService.handleSlider(config);
  			}, 3);
      };    
  	
  	$rootScope.handleCarousel = function(divId, nextId, prevId){
  		commonService.handleCarousel(divId, nextId, prevId);
  	}
  	
  	$rootScope.handleTabWidgets = function(tabWidgetId){
  		commonService.handleTabWidgets('#'+tabWidgetId);
  	}
  	
  	$rootScope.toggleRadioDisplay = function(){
  		if($rootScope.showRadio == true){
  			$rootScope.showRadio = false;
  		}else{
  			$rootScope.showRadio = true;
  			$rootScope.showRadioPlayer();
  		}
  	}
  	
  	$rootScope.toggleNavBar = function(){
  		console.log('Toggle Navigation Bar >>>>>>' +$rootScope.showNavBar);
  		if($rootScope.showNavBar){
  			$rootScope.showNavBar = false;
  		}else{
  			$rootScope.showNavBar = true;
  		}
  	}
  	
  	$rootScope.showRadioPlayer = function(){
  		 $("#audioPlayer").jPlayer({
  		        ready: function(event) {
  		            $(this).jPlayer("setMedia", {
  		                mp3: "http://ec2-54-251-110-128.ap-southeast-1.compute.amazonaws.com:8000/live"
  		            });
  		        },
  		        solution: 'html,flash',
  		        swfPath: "/../js/player/jplayer/js",
  		        supplied: "mp3,oga"
  		    });
  	}
  	
  	$rootScope.addToList = function(video, playlistType) {
  		  $("#"+video.id+"_videoDetailsDiv").hide(1000);
  		  $("#"+video.id+"_playListDiv").show(1000);
  		 setTimeout(function(){
  			 $rootScope.playlist = lscache.get(playlistType);
  			  if(!$rootScope.playlist){
  				  $rootScope.playlist = {type: playlistType, videos: []};
  			  }
  			  if ($rootScope.playlist.videos.indexOf(video) == -1) {
  				  $rootScope.playlist.videos.push(video);
  				  lscache.set(playlistType, $scope.playlist);
  			  }
  			  $rootScope.showPlaylist(playlistType);
  		 }, 1)
  	  };
  	  
  	  $rootScope.removeFromList = function($index, playlistType) {
  		  $rootScope.playlist = lscache.get(playlistType);
  		  if(!$rootScope.playlist){
  			  return;
  		  }
  		  $rootScope.playlist.videos.splice($index, 1);
  		  lscache.set(playlistType, $rootScope.playlist);
  		  $rootScope.showPlaylist(playlistType);
  	  };
  	  
  	  $rootScope.showPlaylist = function(playlistType){
  		  $rootScope.playlist = lscache.get(playlistType);
  		  console.log($rootScope.playlist);
  		  if($rootScope.playlist){
  			  $("#playlistDiv").show(1000);
  			  setTimeout(function () {
  				  $rootScope.$apply(function(){
  						commonService.handleCarousel('#myPlaylist', '#myPlaylist-next', '#myPlaylist-prev');
  						commonService.imgHoverlay();
  					});
  				 }, 1000);
  			  
//  			  $$window.on('ngcontentloaded', init);
  		  }
  	  };
  	  
  	  $rootScope.hidePlaylist = function() {
  		  	$("#playlistDiv").hide(1000);
  		  };
  	  
  	  $rootScope.hideListDiv = function(target, videoId) {
  	  	$("#"+videoId+"_playListDiv").hide(1000);
  	    $("#"+videoId+"_videoDetailsDiv").show(1000);
  	  };

  	
  	$rootScope.connectToChannel = function() {
  		var channelKey = "LIVE_"+$routeParams.eventId;
  		/*
  		eventService.connectChannel(channelKey).then(function(response) {
  			$rootScope.connectToSocket(response.data.data);
  		  },
  		  function(error) {
  			  console.log('ERROR IN CONNECTING CHANNEL: >>>>>> ' +JSON.stringify(error));
  		  });
  		  */
  	}
  	
  	$rootScope.showBillCalculator = function(){
  		$rootScope.showCalculator = true;
  		$rootScope.showPlans = false;
  		$rootScope.gotoTop();
  	}
  	
  	$rootScope.showStreamingPlans = function(){
  		$rootScope.showCalculator = false;
  		$rootScope.showPlans = true;
  	}
  	
  	$rootScope.connectToSocket = function(token){
  		if(socket != null){
  			socket.close();
  		}
  		channel = new goog.appengine.Channel(token);
  	    socket = channel.open();
  	    socket.onopen = $rootScope.onOpened;
  	    socket.onmessage = $rootScope.onMessage;
  	    socket.onerror = $rootScope.onError;
  	    socket.onclose = $rootScope.onClose;
  	}

  	$rootScope.onOpened = function(){
//  		console.log('<<<<<<<<< IN onOpened >>>>>>>>');
  	}

  	$rootScope.onMessage = function(m) {
  		console.log(m);
  		var msg = JSON.parse(m.data);
  		$rootScope.liveRequest(msg);
  	}

  	$rootScope.onError = function(){
//  		console.log('<<<<<<<<< IN onError >>>>>>>>');
  	}

  	$rootScope.onClose = function(){
//  		console.log('<<<<<<<<< IN onClose >>>>>>>>');
  	}
  	
  	$rootScope.liveRequest = function(msg){
  		var serviceType = $(msg).attr("SERVICE");
  		
  		if(serviceType == 'CHAT'){
  			$rootScope.parseMsg(msg);
  		}
  		/*if(serviceType == 'ANALYTICS'){
  			latestAnalytics(xml);
  		}
  		if(serviceType == 'DJ'){
  			liveDjRequest(xml);
  		}
  		if(serviceType == 'ADMIN'){
  			adminMessages(xml);
  		}*/
  		
  	}
  	
  	$rootScope.parseMsg = function(msg) {
  		console.log(msg);
  		var msgId = $(msg).attr("msgId");
  		/*
  		eventService.fetchMessage($routeParams.eventId, msgId).then(function(response) {
  			console.log(response.data.data);
  			$rootScope.messages.push(response.data.data);
  		  },
  		  function(error) {
  			  console.log('ERROR IN FETCHING MESSAGE: >>>>>> ' +JSON.stringify(error));
  		  });
  		 */
  	}
  	
  	$rootScope.safeApply = function(fn) {
  	  var phase = this.$root.$$phase;
  	  if(phase == '$apply' || phase == '$digest') {
  	    if(fn && (typeof(fn) === 'function')) {
  	      fn();
  	    }
  	  } else {
  	    this.$apply(fn);
  	  }
  	};

      
  }
  
  ctrl.$inject = ['$scope', '$rootScope', '$routeParams', '$location', '$anchorScroll', '$sce', '$http', '$window', 'commonService', 'sharedService', 'cloudendpoint', 'authService'];
  return ctrl;

});

