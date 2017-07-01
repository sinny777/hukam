define(function () {
    'use strict';
    
  function ctrl($scope, $rootScope, $routeParams, $location, sharedService){
	  
	  $scope.feature = {};
		$scope.features = {};
		$scope.liveEventSearch = {};
		$scope.weddingEventSearch = {};

		$scope.$on('CurrentUserUpdated ', function() {
			$rootScope.currentUser = sharedService.currentUser;
		});
		
		$scope.$on('$viewContentLoaded', function() {
			$scope.pageContent = sharedService.basicContent;
		});
		
		$scope.setLiveStreamingPage = function() {
			$scope.pageContent = sharedService.basicContent;
			$scope.pageContent.pageTitle = "GransLIVE 4D Live Streaming";
			$scope.pageContent.pageDescription = "Live streaming allows you to listen to music or watch videos live and online." +
					" Streaming means listening to music or watching video in real time. " +
					"But in <strong>GransLive</strong> we have added some marvelous services which " +
					"are not only new to the world but also Discovered by <strong>GransLive</strong>," +
					" which can fill your life with enthusiasm with new zeal and zest.";
			$scope.popularEventsSearch = {
					 part: 'id,snippet',
				        maxResults: 20,
//				        videoCategoryId: '20',
//				        channelId: 'UCVDSXEtvITWGW-zzdbFZ1NQ',
				        order: 'date',
				        type: 'video',
//				        eventType: 'live',
				        videoEmbeddable: "true",
				        chart: 'mostPopular'
			};
			
			$scope.liveEventsSearch = {
					 part: 'id,snippet',
				        maxResults: 20,
//				        videoCategoryId: '20',
//				        channelId: 'UCVDSXEtvITWGW-zzdbFZ1NQ',
				        order: 'date',
				        type: 'video',
//				        eventType: 'live',
				        videoEmbeddable: "true",
				        chart: 'mostPopular',
				        q:'Live Events'
			};
			
			$scope.upcomingEventsSearch = {
					 part: 'id,snippet',
				        maxResults: 20,
//				        videoCategoryId: '20',
//				        channelId: 'UCVDSXEtvITWGW-zzdbFZ1NQ',
				        order: 'date',
				        type: 'video',
				        eventType: 'upcoming',
				        videoEmbeddable: "true",
				        chart: 'mostPopular',
			};
			
			$rootScope.gotoTop();
			
		};
		
		$scope.setEventManagementPage = function() {
			$scope.pageContent = sharedService.basicContent;
			$scope.weddingEventSearch = {
					 part: 'id,snippet',
				        maxResults: 20,
//				        videoCategoryId: '20',
//				        channelId: 'UCVDSXEtvITWGW-zzdbFZ1NQ',
				        order: 'date',
				        type: 'video',
//				        eventType: 'live',
				        videoEmbeddable: "true",
//				        chart: 'mostPopular',
				        q:'Indian Wedding'
			};
			
			$rootScope.gotoTop();
			
		};
		
		$scope.setIoTPage = function() {
			console.log('<<<<<<< IN setIoTPage >>>>>>>>');
			setTimeout(function(){
				$scope.pageContent.pageTitle = "Internet Of Things (IoT)";
				$scope.pageContent.pageDescription = "The Internet of Things (IoT) is a scenario in which objects, animals or people are provided with unique identifiers and " +
						"the ability to transfer data over a network without requiring human-to-human or human-to-computer interaction. " +
						"IoT has evolved from the convergence of wireless technologies, micro-electromechanical systems (MEMS) and the Internet.";
			}, 1);
			
			$rootScope.gotoTop();
			
		};

		$scope.getFeatures = function() {
			var featureKey = $routeParams.featureKey;
					
//			categoryId = $location.search().key;
			gapi.client.feature.get({featureKey: featureKey}).execute(function(resp){
				$scope.$apply(function() {
						$scope.feature = resp;
						$scope.pageContent.pageTitle = $scope.feature.title;
						$scope.pageContent.pageDescription = $scope.feature.content.value;
						
						var req = {categoryId: $scope.feature.id};
						gapi.client.feature.list(req).execute(function(resp){
							$scope.$apply(function() {
									$scope.features = resp.items;
									console.log($scope.features);
							});
				        });	
						
				});
	        });
			
			$rootScope.gotoTop();
				
		};
      
  }
  
  ctrl.$inject = ['$scope', '$rootScope', '$routeParams', '$location', 'sharedService'];
  return ctrl;

});

