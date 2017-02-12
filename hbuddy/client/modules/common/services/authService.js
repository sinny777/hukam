
define(['angular'], function (angular) {
    "use strict";

  var factory = function (LoopBackAuth, MyUser, UserIdentity, CONFIG, $cookies) {

	  var authUriBase = CONFIG.API_URL;

	  // Inherit from LoopBackAuth so we don't need to keep modifying it.
	  // Note that this method didn't work. I think because a new version of LoopBackAuth was used instead of the singleton.
	  //var Auth = Object.create(LoopBackAuth);
	  var Auth = LoopBackAuth;

	  /**
	   * Returns a url to be used for authentication.
	   */
	  Auth.authUri = function(provider) {
	    return authUriBase + provider;
	  };

	  Auth.currentUser = null;

	  /**
	   * Gets all available info on authenticated user
	   *
	   * @return {Object} user
	   */
	  Auth.ensureCurrentUser = function(callback) {
	    if (Auth.currentUser) {
	      console.log('Using cached user');
	      if(callback){
	    	  callback(Auth.currentUser);
	      }
	    }
	    if(!Auth.isLoggedIn()) {
	      console.log('User not logged in.');
	      Auth.currentUser = null;
	      
	      var cookies = $cookies.getAll();
	    	var accessTokenId = cookies['access_token'];
	    	if(accessTokenId){
	    		accessTokenId = accessTokenId.split('.')[0];
		    	accessTokenId = accessTokenId.split(':')[1];
	    	}
	    	console.log('accessTokenId: >>>> ' +accessTokenId);
	    	if(accessTokenId){
	    		var userId = cookies['userId'];
	    		if(userId){
	    			userId = userId.split('.')[0];
	    			userId = userId.split(':')[1];
		    	}
	    		console.log('userId: >>>> ' +userId);
	    		Auth.currentUserId = userId;
	    		Auth.accessTokenId = accessTokenId;
	    		Auth.rememberMe = true;
	    		var findUserReq = {filter: {where: {"_id": userId}}};
	    		MyUser.findById({id:userId}).$promise.then(function(userObj){
	    			console.log('userObj: >>>>>>>>>> ', userObj);
	    			
	    			Auth.currentUser = userObj;
					Auth.setUser(accessTokenId, userId, Auth.currentUser);
    				Auth.save();
	    			
	    			if(!userObj.profile){
	    				Auth.getUserProfileData(userObj, callback);
	    			}else{
	    				if(callback){
	    			    	  callback(Auth.currentUser);
	    			      }
	    			}	    			
	    		}).catch(function(e) {
	    			  console.log("ERROR: >>> ", e);
	    			  if(callback){
    			    	  callback(Auth.currentUser);
    			      }
	    		});
	        }else{
	        	if(callback){
			    	  callback(Auth.currentUser);
			      }
	        }
	    } else {
	      // Fetch the actual user data.
	      console.log('Auth.currentUserId: >> ', Auth.currentUserId);
	      MyUser.findById({id:Auth.currentUserId}).$promise.then(function(userObj){
	  			console.log('LOGGED IN USER: >>>>>>>>>> ', userObj);
	  			Auth.currentUser = userObj;
	  			if(!userObj.profile){
	  				Auth.getUserProfileData(userObj, callback);
	  			}else{
	  				if(callback){
	  			    	  callback(Auth.currentUser);
	  			      }
	  			}	    			
	  		}).catch(function(e) {
	  			  console.log("ERROR: >>> ", e);
	  			  if(callback){
				    	  callback(Auth.currentUser);
				      }
	  		});
	      
	      /*
	      MyUser.getCurrent(function(userData) {
	        console.log("Current User Fetch Success: >>> ", userData);
	        Auth.currentUser = userData;
	        if(callback){
		    	  callback(userData);
		      }	        
	      },
	      function(err) {
	        console.log("Current User Fetch Failed:", err);
	        callback(null);
	      });
	      */
	    }
	  };
	  
	  Auth.getUserProfileData = function(userObj, callback){
		  if(userObj && !userObj.profile){
			  Auth.currentUser = userObj;
				var findReq = {filter: {where: {"userId": userObj.id}}};
				MyUser.identities({id: userObj.id}).$promise.then(function(userIdentityObj){
  				console.log('userIdentityObj:>>>>> ' , userIdentityObj);
  				if(userIdentityObj && userIdentityObj[0]){
  					userObj.provider = userIdentityObj[0].provider;
					userObj.profile = userIdentityObj[0].profile._json;
				}
				
				if(userIdentityObj && userIdentityObj.profile){
					userObj.provider = userIdentityObj.provider;
					userObj.profile = userIdentityObj.profile._json;
				}
				Auth.currentUser = userObj;
					MyUser.upsert(userObj,
					  function(userObj) { 
						console.log('USER UPDATED: >>>> ', userObj);
			    		$rootScope.currentUser = userObj;
			    		Auth.currentUser = userObj;
					  },
					  function(errorResponse) { 
						  console.log("ERROR IN UPDATING USER: >>> ", errorResponse);
					  });
				
  				console.log('Auth.currentUser: >>> ', Auth.currentUser);
  				if(callback){
  			    	  callback(userObj);
  			      }
	  			},
	  			function(err){
	  				console.log('ERROR: >>>>> ', err);
	  				if(callback){
	  			    	  callback(Auth.currentUser);
	  			      }
	  			});
			}
	  }

	  /**
	   * Check if a user is logged in
	   *
	   * @return {Boolean}
	   */
	  Auth.isLoggedIn = function() {
		  return Auth.currentUserId && Auth.accessTokenId;
	  };
	  
	  Auth.login = function(credentials, callback) {
		  MyUser.login(credentials).$promise.then(function(userObj){
			  console.log("In authService, AFTER LOGIN: >> ", userObj);
			  if(!userObj.provider){
				  userObj.provider = 'hukam';
				  if(userObj.user && !userObj.profile){
					  userObj.profile = userObj.user;
					  delete userObj.user;
					  Auth.currentUser = userObj;
					  Auth.save();
					  if(callback){
						  callback(userObj);
					  }
				  }
			  }
			  
			  if(callback){
				  callback(userObj);
			  }
			  
			  return userObj;
		 });
	  };

	  Auth.logout = function(callback) {
		  MyUser.logout().$promise.then(function(resp) {
		    Auth.currentUser = null;
		    Auth.clearUser();
		    Auth.clearStorage();
		    Auth.save();
		    $cookies.remove('access_token');
		    $cookies.remove('userId');
		    delete $cookies['access_token'];
		    delete $cookies['userId'];
		    console.log('User logged out successfully >>>>>>>> ');
		    if(callback){
		    	callback();
		    }
		    
		  }).catch(function(){
			 console.log('ERROR in Logout call >>>> '); 
			 Auth.currentUser = null;
			    Auth.clearUser();
			    Auth.clearStorage();
			    Auth.save();
			    $cookies.remove('access_token');
			    $cookies.remove('userId');
			    delete $cookies['access_token'];
			    delete $cookies['userId'];
			    console.log('User cleared out successfully >>>>>>>> ');
			    if(callback){
			    	callback();
			    }
		  });
	  };

	  /**
	   * Waits for currentUser to resolve before checking if user is logged in
	   */
	  Auth.isLoggedInAsync = function(cb) {
	    if(Auth.currentUser && Auth.currentUser.hasOwnProperty('$promise')) {
	      Auth.currentUser.$promise.then(function() {
	        cb(true);
	      }).catch(function() {
	        cb(false);
	      });
	    } else if(Auth.currentUser && Auth.currentUser.hasOwnProperty('role')) {
	      cb(true);
	    } else {
	      cb(false);
	    }
	  };

	  return Auth;
	
  }

	factory.$inject = ['LoopBackAuth', 'MyUser', 'UserIdentity', 'CONFIG', '$cookies'];
	return factory;
});

