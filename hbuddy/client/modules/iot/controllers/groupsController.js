define(function () {
    'use strict';

  function ctrl($rootScope, $scope, Group){
	  
	  $scope.display = 'groups';
	  $scope.selectedGroup = {};
	  $scope.member = {};
	  $scope.showAddMember = '';
	  
	  $scope.initGroups = function(){
		  $scope.fetchAndShowGroups();
	  }
	  
	  $scope.fetchAndShowGroups = function(){
		  console.log('IN fetchAndShowGroups: ', $scope.selectedPlace.groups);
		  $scope.selectedGroup = {};
		  if(!$scope.selectedPlace.groups || $scope.selectedPlace.groups.length == 0){
			  $scope.fetchGroups();
		  }else{
			  $scope.display = "groups";
		  }
	  };
	  
	  $scope.showAddNewGroupPanel = function(){
		  console.log('IN showAddNewGroupPanel: ');
		  $scope.selectedGroup = {};
		  $scope.display = "saveGroupPanel";
	  };
	  
	  $scope.showUpdateGroupPanel = function(group){
		  console.log('IN showUpdateGroupPanel for Group: ', group);
		  $scope.selectedGroup = group;
		  $scope.display = "saveGroupPanel";
	  };
	  
	  
    $scope.fetchGroups = function(){
    	console.log('IN fetchGroups for Place >>>>>>>>>> ', $scope.selectedPlace);
    	$scope.showAddMember = '';
    	$rootScope.loadingScreen.show();
    	var ownerId = $rootScope.currentUser.id;
    	if($rootScope.currentUser.userId){
    		ownerId = $rootScope.currentUser.userId;
    	}
    	
    	var email = $rootScope.currentUser.profile && $rootScope.currentUser.profile.email;
    	if(!email){
    		email = $rootScope.currentUser.email;
    	}
    	
    	var findReq = {
    			  		 where: {"or": [{"members": {"elemMatch": {"username": {"$eq": email}}}},
    			  		                {"ownerId":ownerId}]
    			  		 		},
    			  		 		"and":[{"placeId": $scope.selectedPlace.id}]
				};
    	console.log('findReq: >>> ', findReq);
    	
    	Group.find(findReq,
    			  function(list) { 
    				  $rootScope.loadingScreen.hide();
    				  $scope.selectedPlace.groups = list;
    				  $scope.display = 'groups';
    			  },
	    		  function(errorResponse) { 
    				  console.log(errorResponse);
    				  $scope.display = 'groups';
    				  $rootScope.loadingScreen.hide();
    			  });
    };
    
    $scope.saveGroup = function(){
    	console.log('$rootScope.currentUser: >> ', $rootScope.currentUser);
    	console.log('$scope.selectedPlace: >> ', $scope.selectedPlace);
    	var ownerId = $rootScope.currentUser.id;
    	if($rootScope.currentUser.userId){
    		ownerId = $rootScope.currentUser.userId;
    	}
    	$scope.selectedGroup.ownerId = ownerId;
    	$scope.selectedGroup.placeId = $scope.selectedPlace.id;
    	console.log('IN saveGroup: >>>>>', $scope.selectedGroup);
    	$rootScope.loadingScreen.show();
    	$scope.selectedGroup = Group.upsert($scope.selectedGroup,
		  function(group) { 
    		$rootScope.loadingScreen.hide();
			$scope.selectedGroup = group;
			console.log('GROUP SAVED: >>>> ', group);
			$scope.fetchAndShowGroups();
		  },
		  function(errorResponse) {
			  $rootScope.loadingScreen.hide();
			  console.log(errorResponse);
			  $scope.fetchAndShowGroups();
		  });
    };
    
    $scope.showAddMemberPanel = function(group){
    	$scope.selectedGroup = group;
    	$scope.showAddMember = group.id;
    	$scope.member = {status: 'invited'};
    	console.log('IN showAddMemberPanel: ', $scope.showAddMember);
    };
    
    $scope.inviteNewMember = function(){
    	console.log('Member to invite: >>>', $scope.member);
    	
    	if(!$scope.selectedGroup || !$scope.selectedGroup.id){
    		alert("No Group Selected !");
    		return;
    	}
    	
    	if(!$scope.selectedGroup.members){
    		$scope.selectedGroup.members = [];
    	}
    	if($scope.member.password){
    		delete $scope.member.password;
    	}
    	$scope.selectedGroup.members.push($scope.member);
    	$scope.saveGroup();
    	
    };
    
    $scope.cancelAddMember = function(){
    	console.log('In cancelAddMember: >>>');
    	$scope.selectedGroup = {};
    	$scope.showAddMember = '';
    };
    
    $scope.deleteMember = function(group, member){
    	$rootScope.loadingScreen.show();
    	$scope.selectedGroup = group;
    	var index = $scope.selectedGroup.members.indexOf(member);
    	$scope.selectedGroup.members.splice(index, 1);
    	$scope.saveGroup();
    };
    
  }
  
  ctrl.$inject = ['$rootScope', '$scope', 'Group'];
  return ctrl;

});

