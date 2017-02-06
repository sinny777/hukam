
define(['angular'], function (angular) {
    "use strict";

  var factory = function ($rootScope, $cookieStore, $http) {
	  
	  var service = {};

	  service.basicContent = {
			    'siteName':'hBuddy',
			  	'pageTitle':'hBuddy - Business Solutions',
				'pageDescription':'For Webcasting Live Events with the availability of many live services to the online viewers and Internet of Things with Home Automation that includes Smart Meters and Smart WiFi Switches',
				'topHeader' : 'modules/common/partials/common/topHeader.htm',
				'stickyMenu' : 'modules/common/partials/common/stickyMenu.htm',
				'topBar' : 'modules/common/partials/common/topBar.htm',
				'navBar' : 'modules/common/partials/common/navBar.htm',
				'login' : 'modules/common/partials/common/login.htm',
				'revolutionSlider' : 'modules/common/partials/common/slider/slider.htm',
				'footer' : 'modules/common/partials/common/footer.htm',
				'message' : {
					'msgClass' : '',
					'text' : null
				},
	  			'contact': {
	  				'email': 'contact.hukam@gmail.com',
	  				'phone': '+91 9643989377',
	  				'addressLine1': '#198, Swami Enclave',
	  				'addressLine2': 'Dhakoli, Zirakpur',
	  				'state': 'PUNJAB'
	  			}
			};
			
			service.config = {directFromYoutube: true};

			service.streamName = "livestream";
			service.html5Source = "http://d1yzfykhwf2dgy.cloudfront.net/videos";
			/*service.flashSource = "rtmp://ec2-54-251-110-128.ap-southeast-1.compute.amazonaws.com/live";
			service.rtmpUrl = "rtmp://ec2-54-251-110-128.ap-southeast-1.compute.amazonaws.com/live";*/
			service.flashSource = "rtmp://localhost/live";
			service.rtmpUrl = "rtmp://localhost/live";
			
			service.serverName = window.location.host;
			service.serverName = '//' + service.serverName.toLowerCase();
			service.commonServer = '//granslive.appspot.com/api/web/v1';
			service.authServer = '//accounts.granslive.appspot.com/api/auth/v1';
			service.streamingServer = '//streaming.granslive.appspot.com/api/streaming/v1';
			service.iotServer = '//iot.granslive.appspot.com/rest/iot/v1';

			/*service.commonServer = 'http://localhost:8080/api/web/v1';
			service.authServer = 'http://localhost:8001/api/auth/v1';
			service.streamingServer = 'http://localhost:8002/api/streaming/v1';*/

			service.loginLable = 'Login';
			service.isLogin = false;
			service.currentUser = {
				'imagePath' : '/../images/icons/avatar.png'
			};
			
			service.plan = {};
			service.showCalculator = false;
			service.showPlans = true;
			
			service.setCurrentUser = function (currentUser){
				service.currentUser = currentUser;
				$rootScope.currentUser = currentUser;
				/*storageService.put(currentUser.id, currentUser);
				storageService.put('UKEY', currentUser);*/
				service.broadcastCurrentUser();
				service.setLoginLabel();
			};
			
			service.broadcastCurrentUser = function(){
				$rootScope.$broadcast('CurrentUserUpdated');
			};
			
			service.setLoginLabel = function(){
				if($rootScope.currentUser == undefined || $rootScope.currentUser == null || $rootScope.currentUser.id == '' || $rootScope.currentUser.id == null){
					 $rootScope.loginLable = 'Login';
					 $rootScope.isLogin = false;
					 return false;
				  }
				if(!($rootScope.currentUser.emailId == undefined || $rootScope.currentUser.emailId == null)){
					  $rootScope.loginLable =  $rootScope.currentUser.emailId.split('@')[0];
					  $rootScope.isLogin = true;
				  }
				  
				  if(!($rootScope.currentUser.firstName == undefined || $rootScope.currentUser.firstName == null)){
					  $rootScope.loginLable =  $rootScope.currentUser.firstName;
					  $rootScope.isLogin = true;
				  }
				  
				  if(!($rootScope.currentUser.nickname == undefined || $rootScope.currentUser.nickname == null)){
					  $rootScope.loginLable =  $rootScope.currentUser.nickname;
					  $rootScope.isLogin = true;
				  }
				  
				  $rootScope.currentUser.nickname = $rootScope.loginLable;
			}
			
			service.getHeaders = function(){
				var headerStr = {headers:{}};
				var userCookie = $cookieStore.get('UKEY');
				if(userCookie == undefined || userCookie == null || userCookie.length == 0){
//					headerStr = {'Content-Type': 'application/json', 'Accept':'application/json', 'Authorization':'Basic bGVzczpwQHNzdzByZA=='};
					headerStr = {'Content-Type': 'application/json', 'Accept':'application/json'};
				}else{
					var userId = userCookie.split(',')[0];
					userId = userId.replace('"', '');
					headerStr = {'Content-Type': 'application/json', 'Accept':'application/json', 'Authorization':'Basic bGVzczpwQHNzdzByZA==','X-UserId':userId};
				}
				
				return headerStr;
			}
			
			service.setAPIHeaders = function(){
				var userCookie = $cookieStore.get('UKEY');
				var userId = userCookie.split(',')[0];
		   		userId = userId.replace('"', '');
				$http.defaults.headers.common['X-UserId'] = userId;
				$http.defaults.headers.common['Content-Type'] = 'application/json';
				$http.defaults.headers.common['Accept'] = 'application/json';
				$http.defaults.headers.common['Authorization'] = 'Basic bGVzczpwQHNzdzByZA==';
			}

	  return service;
	
  }

	factory.$inject = ['$rootScope', '$cookieStore', '$http'];
	return factory;
});

