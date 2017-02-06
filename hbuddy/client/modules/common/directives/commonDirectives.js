
define(function (require) {
	
    'use strict';

var angular = require('angular');

var commonDirectives = angular.module('commonDirectives', ['ng']);

commonDirectives.directive('dirDisqus', ['$window', function($window) {
    return {
        restrict: 'E',
        scope: {
            disqus_shortname: '@disqusShortname',
            disqus_identifier: '@disqusIdentifier',
            disqus_title: '@disqusTitle',
            disqus_url: '@disqusUrl',
            disqus_category_id: '@disqusCategoryId',
            disqus_disable_mobile: '@disqusDisableMobile',
            readyToBind: "@"
        },
        template: '<div id="disqus_thread"></div>',
        link: function(scope) {

            // ensure that the disqus_identifier and disqus_url are both set, otherwise we will run in to identifier conflicts when using URLs with "#" in them
            // see http://help.disqus.com/customer/portal/articles/662547-why-are-the-same-comments-showing-up-on-multiple-pages-
            if (typeof scope.disqus_identifier === 'undefined' || typeof scope.disqus_url === 'undefined') {
                throw "Please ensure that the 'disqus-identifier' and 'disqus-url' attributes are both set.";
            }

            scope.$watch("readyToBind", function(isReady) {

                // If the directive has been called without the 'ready-to-bind' attribute, we
                // set the default to "true" so that Disqus will be loaded straight away.
                if ( !angular.isDefined( isReady ) ) {
                    isReady = "true";
                }
                if (scope.$eval(isReady)) {
                    // put the config variables into separate global vars so that the Disqus script can see them
                    $window.disqus_shortname = scope.disqus_shortname;
                    $window.disqus_identifier = scope.disqus_identifier;
                    $window.disqus_title = scope.disqus_title;
                    $window.disqus_url = scope.disqus_url;
                    $window.disqus_category_id = scope.disqus_category_id;
                    $window.disqus_disable_mobile = scope.disqus_disable_mobile;

                    // get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
                    if (!$window.DISQUS) {
                        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                        dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                    } else {
                        $window.DISQUS.reset({
                            reload: true,
                            config: function () {
                                this.page.identifier = scope.disqus_identifier;
                                this.page.url = scope.disqus_url;
                                this.page.title = scope.disqus_title;
                            }
                        });
                    }
                }
            });
        }
    };
}]);

commonDirectives.directive('addthisToolbox', ['$timeout', function($timeout) {
		
		return{
			restrict : 'A',
			  transclude : true,
			  replace : true,
			  template : '<div ng-transclude></div>',
			  link : function($scope, element, attrs) {
				  $timeout(function () {
		        addthis.init();
		        addthis.toolbox($(element).get(), {}, {
		          url: attrs.url,
		          title : "My Awesome Blog",
		          description : 'Checkout this awesome post on blog.me'        
		        });
		      });
			  }
		};
		
		/*
		return {
	        restrict: 'A',
	        transclude: true,
	        replace: true,
	        template: '<div ng-transclude></div>',
	        link: function ($scope, element, attrs) {
	            // Checks if addthis is loaded yet (initial page load)
	            if (addthis.layers.refresh) {
	               addthis.layers.refresh();
	            }
	        }
	    };
	    */
		
	}]);

commonDirectives.directive('fbLikeBox', ['$timeout', function($timeout) {
	  return {
	    restrict : 'EA',
		  transclude : true,
		  replace : true,
		  templateUrl : '/modules/common/partials/ads/fbLikeBox.htm',
		  link : function($scope, element, attrs) {
			  
			  console.log('<<<<<<<<<<, LOAD FB LIKE BOX >>>>>>>>>>>>');
			  
		  }
		};
	}]);

/*
commonDirectives.directive('googleAdSense', function () {
  return {
      restrict: 'A',
      replace: true,       
      templateUrl: "/modules/common/partials/ads/googleAds.htm",
      controller: function () {
          (adsbygoogle = window.adsbygoogle || []).push({});
      }
  };
});
*/

commonDirectives.directive('datePicker', function(dateFilter){
	
	var dateFormat = "dd-MMM-yyyy";
	
	  return {
	    restrict: 'E',
	    replace: true,
	    scope: {
	        ngModel: '='
	    },
	    controller: [ "$scope","$filter", function ($scope, $filter) {
	    	$scope.$watch("ngModel", function(newValue, oldValue, srcScope) {
	    		if(newValue == undefined || newValue == 'undefined'){
//	    			$scope.ngModel = dateFilter(new Date(), dateFormat);
//	    			$scope.ngModel = $filter('date')(new Date(), dateFormat);
	    		}else if($.isNumeric(newValue)){
	    			$scope.ngModel = $filter('date')(new Date(parseInt(newValue)), dateFormat);
//	    			$scope.ngModel = dateFilter(new Date(parseInt(newValue)), dateFormat);
	    		}else{
//	    			$scope.ngModel = dateFilter(new Date(newValue), dateFormat);
	    			$scope.ngModel = $filter('date')(new Date(newValue), dateFormat);
	    		}
    		});
	    }],
	    link: function(scope, element, attrs, controller){
	    	
	    	var input = element.find('input');
	        element.datetimepicker({
	        format: "dd-M-yyyy",
	        showMeridian: false,
	        autoclose: true,
	        todayBtn: true,
	        pickerPosition: 'bottom-left',
	        todayHighlight: true,
            startDate: "1960-01-01",
            minView: "day"
	      });
	  
	      element.bind('blur keyup change', function() {
	        scope.$apply(read);
	      });
	      
	      function read() {
//	        scope.ngModel = dateFilter(new Date(input.val()), dateFormat);
	    	  /*console.log('toDateString(): >> ' +scope.ngModel);
		        console.log('toDateString(): >> ' +new Date(scope.ngModel).toDateString());
				console.log('toGMTString(): >> ' +new Date(scope.ngModel).toGMTString());
				console.log('toISOString(): >> ' +new Date(scope.ngModel).toISOString());
				console.log('toLocaleDateString(): >> ' +new Date(scope.ngModel).toLocaleDateString());
				console.log('toLocaleString(): >> ' +new Date(scope.ngModel).toLocaleString());
				console.log('toLocaleTimeString(): >> ' +new Date(scope.ngModel).toLocaleTimeString());
				console.log('toString(): >> ' +new Date(scope.ngModel).toString());
				console.log('toTimeString(): >> ' +new Date(scope.ngModel).toTimeString());
				console.log('toUTCString(): >> ' +new Date(scope.ngModel).toUTCString());*/
	      }
	    },
	    template: '<div class="input-append date form_datetime">'+
        '<input type="text" readonly data-date-format="dd-M-yyyy" ng-model="ngModel" size="30" data-date required>'+
        '<span class="add-on"><em class="fa fa-calendar"></em></span>'+
      '</div>'
	  }
	});


commonDirectives.directive('dateTimePicker', function(dateFilter){
	var dateFormat = "yyyy-MM-dd HH:mm:ss";
	  return {
	    restrict: 'E',
	    replace: true,
	    scope: {
	        ngModel: '='
	    },
	    controller: [ "$scope","$filter", function ($scope, $filter) {
	    	$scope.$watch("ngModel", function(newValue, oldValue, srcScope) {
	    		if(newValue == undefined || newValue == 'undefined'){
//	    			$scope.ngModel = dateFilter(new Date(), dateFormat);
	    			$scope.ngModel = $filter('date')(new Date(), dateFormat);
	    		}else if($.isNumeric(newValue)){
	    			$scope.ngModel = $filter('date')(new Date(parseInt(newValue)), dateFormat);
//	    			$scope.ngModel = dateFilter(new Date(parseInt(newValue)), dateFormat);
	    		}else{
	    			$scope.ngModel = $filter('date')(new Date(newValue), dateFormat);
//	    			$scope.ngModel = new Date(newValue);
	    		}
    		});
	    }],
	    link: function(scope, element, attrs, controller){
	    	
	       var input = element.find('input');
	        element.datetimepicker({
	        format: "yyyy-M-dd hh:ii:ss",
	        showMeridian: true,
	        autoclose: true,
	        todayBtn: true,
	        pickerPosition: 'bottom-left',
	        todayHighlight: true,
//            startDate: new Date()
	      });
	  
	      element.bind('blur keyup change', function() {
	        scope.$apply(read);
	      });
	      
	      function read() {
//	    	  scope.ngModel = new Date(scope.ngModel);
	      }
	    },
	    template: '<div class="input-append date form_datetime">'+
        '<input type="text" readonly data-date-format="yyyy-M-dd hh:ii:ss" ng-model="ngModel" size="50" data-date-time>'+
        '<span class="add-on"><em class="fa fa-calendar"></em></span>'+
      '</div>'
	  }
	});

commonDirectives.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                    'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});

commonDirectives.directive('errSrc', function($http) {
	return {
	    link: function(scope, element, attrs) {
	      scope.$watch(function() {
	          return attrs['ngSrc'];
	        }, function (value) {
	          if (!value) {
	            element.attr('src', attrs.errSrc);  
	          }
	      });

	      element.bind('error', function() {
	    	  console.log('ERROR >>>>>>>>>>>>>>> ' +value);
	          element.attr('src', attrs.errSrc);
	      });
	      
	      element.on('error', function() {
	    	  element.attr('src', attrs.errSrc);
          });
	    }
	  }
});

commonDirectives.directive('fallbackSrc', function() {
    var missingDefault = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAASAAAATgAAAAAAAABgAAAAAQAAAGAAAAABUGFpbnQuTkVUIHYzLjUuMTEA/9sAQwAEAgMDAwIEAwMDBAQEBAUJBgUFBQULCAgGCQ0LDQ0NCwwMDhAUEQ4PEw8MDBIYEhMVFhcXFw4RGRsZFhoUFhcW/9sAQwEEBAQFBQUKBgYKFg8MDxYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYW/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+ggKcBQBRQAUAZpQKUUAFOAxRSgUAIBThQBTqAAClAoApwFACU4CilAoAQCnYoxTsUAJilpcUtACYpaXFLQAmKXFLiloAbilxTsUuKAG0YNOowaAExS4FLilxQA2inYooAbRg07BpcGgBmDRg0/FGKAGYNFPxSYNADaKdg0UANxSYp+BSYoAbikwafikoAbikxT6TFADMUYp2KMUAR4oxT8UmKAGYpMU/FJigCPFJin4pMUAMpCKfSEUAMIppFSEU2gBhFIRTyKaRQAykIp9NoAaRmm08ikNADaQilooAbiilxRQAtKBSAZpwoABTqKUCgAApwFAFKKAACnAUU4CgBAKUClApQKAClApaUCgBMU7FGKdigBMUuKUClxQAmKXFLiloATFLS4paAG4NLinYpcUANpcUtLigBuKXAp2KKAG0YNOooATFGKWigBMUYpaKAExRilooATBpMGnUUANowKdRigBmKTBp+KMUAMxSYp9JigBlGKdijFADMUmKdiigBmKTFPxSYoAjxSYp+KTFADKQin00igBpFNxTyKQigCMikIp5FIRQAwim08ikNAEZGKQin00jFADTTaeRSEUANooooAdTqAMUoFAABTgKAKUUAAFOopwoAAKUCgCnAUAAFLQBTqADGKUClApQKAEApwFFOAoATFLRinAUAJilpcUuKAExS0uKWgBMUuKKKACijBpcUAJRTqMGgBMGjFOxRigBuKXAp2BRigBuBRgU6igBuBSYp9GBQAzFGKfgUmKAGYNFPxSYoAbRTsUmKAEpMUtFADcUYp1GKAI8UYp+KTFAEeKMU7FJigBmKQin0hFADKaRipCKaaAGEUhFPIpCKAI6aRUlNNADCKQjNPIppFADCKbUhFNNAEZGKQinn0ptADaKXFFACgU4CgU4UAAp1ApwFAAKUChRTgKAAClAzQBmnAUAFOFAFOAoAQClApQKWgApQKUClAoAQCnYop2KAExS0UUAFFLiloATFLS4paAExS4pcUuKAG0uKXBpcUANxS4FOxRigBtFOowaAG0U7BowaAG0U7BowaAG4oxTqMCgBmKTBp+KMUAMpMU+kxQAzBoxTsUYoAZikp+KSgBtGKXFJQA0ikxT6QigBlNIqTFNIoAaRTaeRSUARkUhFPIpCKAGEZptPIpCKAIzSEU+mmgBjCmkU8jFIwoAYRmmmnsKawoAZRTqKAHAUqihRTgKABR3pyikApwoAUClAoFOoAKcBQKcBQAAYpQKAKWgApwFFOAxQAgFOAoApaACiilAoAAKWgCnUAJilxS4paAExS4pcUuKAExS0uKWgBuDS4p2KMUAJgUU6igBuDS4pcGlwaAG4oxTsUYoAbijBp2KTBoAbg0U7BooAbgUmKfikxQAzFGKdg0YoAZikxT8UlADMUmKfikoAZikxTyKQigCOinUhFACYzTadRQAwimkU8jFIRQAymkYp5FJQAwimkU8jFIRQAwjNNNPYU0igBh9KaakIppoAjPFNIqQ02gBmKKWigBwp1ApVoAUU4UiinKKAFHFOApFFOUUACinAUgFOoAKdQBTgMUAAGKUCgCloAKKAM07FAAKUClAxSgUAJinUAU7FACYpaXFLQAYoxTsUUAJilpcUtADcGlxTsUYoATFGDTqMGgBMGjFOxRigBuKMU7FGKAG4oxTsUYoAZg0U/FJg0ANxSYp+KTFADKKdg0YoAZikp+KSgBmKSn4pKAIyKQin4pCKAGU0ipKaRigBhFJTyKQigBtNIxTqKAGEU0inkYpCKAGU008ikoAjIxSMKeaaaAGMKawp5ppFADGFNanmmmgBtFLiigBRThQKcKAAU4UCnCgAFOFApwoAKcBSKKcooAAKcooApaACgDNFOHpQAU4UClAoAAKcBQBSgZoAAKcBRinAUAIBS0YzTsUAJilpcUtACYpaXFLigBMUuKXFLigBuKXFLg0uKAG4pcCnYoxQA3AowKdRQA3ApMU+jAoAZijBp2KMUAMpMU/FGKAI8UYp+KTFADMUmKfikxQBHiinYpMUAMxSEU+kIoAYRTSKkIptADCKaRTzSEUAMIzTaeRSEUANppp1FAEZFIwp9NNADSKaacaRhQAw0009qa1ADDTTT29aa1ADKKdiigBVpy0lOoAVactIKcKAFWlFFOFAAKcKBThQAUUUq0AKKcBikUU5RQAAU4ChRSgZoAUClAoAp1ABSgUAUoFAAKcBRTgKAEApaUCloATFLilxS4oATFLS4pcUAJijFOxS4oAbiinUYNADaKdg0YNADaKdg0YNADcCkxT8UmKAGYNGKfikoAZikp+KSgBmKTFPxSEUAR4pCKeRSEUAMptSEZptADCKQinEYpCKAGEU01IRTaAIyKRhT6aaAGMKSnGmmgANNNOpGoAYabT2prUAMNNNPamtQAw0009qa1ADKKdRQAq05aSnCgBVpy0gp1ACrTlpKcKAFWloooAVaUUU4UAApwoFOFAAKcPSgU4CgApQKFFKBQAoFKKBTgKAClApQKUCgAApaAKdQAmKXFLilxQAYoxTsUYoATFLilxS0ANwaXBpaKAExRilooATFJg06igBtGKdRigBmKSn4pKAGYpKfikoAZikxT8UhFAEZFIRTzTSKAGEUhp5FNIoAZTSMVIaaaAGEUhFOpGFADDTTT2pretADDTae1NagBlFK1JQA00009qa1ADKaae1IaAIzTTUjUxqAGUU6igBVpy0gp1ACrTlpKcKAFWnLSU6gApVpKdQAq05aQU4UAKtOX1pBThQAq0o5opwoABTqBThQAU4CkApwFAABTgKAKUDNAABTqKcBQAgFLilApaADFFFFABRS4paAG4NLinYNGKAG4oxTsUYoAbijBp2KMUAMop2DRigBtFLikoATFJTqKAGEU0inkUhFADCKaakIzTaAGEU0inkU0jFADGFIRTiKRhQAwim09qa3rQAw001IaaaAIzTTUhppoAjNNNSNTWoAbTTTqRqAGU2ntTWoAYaaae1NagBlFOxRQALT1pq09elAAKetNWnrQAq0tA6UUAKtOWkFOFACrTlpBThQA5actNFOoAVactJTqAFWnLSU4UAKopQKKdQACnUCnCgAFKBQBS0AFFFOAoAQClxSgUuKAExS4p2KMUAJijFOxS4FADcCjAp1FADcCkxT6MUAMxSU/FJQAzFJT8UlADCKSnEUhFACUhFLRQAwikIp5FNYUAMNNp7CmtQAymmntSNQBGaaakamtQBHSNTmpDQAxqYakNNNAEZppp7U1qAGUUrUlADTTTT2prUAMpppx60jUAMooPWigB1Opq9acOtADqcKRactAC0L1opVoActOWkXpTh0oAVactIKcKAFWnLSU4UAKtOWkpwoAVactIKcKAFWnLSCnCgBVpyikFOoAKKKcKACnAUAUoFAABS4pQKWgAxRinYoxQAmKWnYooAbRg07BpcGgBlGKdg0UAMxSU/FJQAzFJTyKQigCMikIp9NIxQAwikp7CmsKAEppp1BoAjNNNSGmmgCM001IaaaAIzTTUhpjUAMNNp7U1qAGNTTT2prUAMNNp7U1qAGGm09qYetAA3SmNT6bQAxqa1PNNoAbRRRQAq05aRelOXpQAq09elNHSnUAFOFNFOHWgB1OHWkWnLQAq9aetNWnLQAq9aetNWnLQA5actIOlOFACrTlpBThQA5acKaKcKAHCiiigBVpy0gpwoAVRTgKQU4UAAFOFApwoAAKMUoFKBQAYowadijBoATFGKdijFADcGkp+KTFADMUlPxSUAMIpCKeRTWFADCKbTyKQigCM001IaaaAIzRTjTaAEam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I4rqFUKoVRgKMAVy0IuI33xrIrDoQDU/2i//AOek/wCtAHR0VzouL7/npN+tL599/wA9Jv1oA6Giue8++/56TfrR59//AM9Jv1oA6Giue8++/wCek360faL7/npN+tAHQ1n69aebD56D54xz7is37Rf/APPSb9aabi//AOek/wCtADdN/wCQjD/10H861PFH/IPT/rqP5GszTo5BqEJMbf6wZ+WtPxV/yD0/66j+RoA58000401qAGmm0rU1qAENNPSlamtQAlDdKKRqAGtTWpzUw9aAEamN1pxptADTTacelNbpQA09KaelK1NbpQAjdKY1OamtQA1qa3WnN1ph60ANPWiig9KAGnpTW6U5ulMagBKKKKAAU4dKYvSnLQA+nU1elOHSgAXrT1plOFAD1py0wdaetAD16U4dKYtOWgB46U4UxactAD6cKYtPFADh1p60wU4UAPWnLTKdQA6lWkooAetOWmU4UAPWnKaYKcDQA9TXQWeqWcdnFG0jbljUH5T1ArngaUGgDpf7Wsf+erf98Gl/tay/56N/3ya5oGnZoA6P+1bL/no3/fJo/tWy/wCejf8AfJrnc0uaAOi/tSz/AOejf98mj+1LP/no3/fJrncmjJoA6L+1LP8A56N/3yaT+1bL/no3/fJrnqM0AdD/AGrZf89G/wC+TSf2tY/89G/75Nc7mgmgDov7Wsf+ejf98GqOvX9tc2axwuSwkBOVI4wf8ayc00mgAJpppSaaxoAQ000rGmtQAhptK1JQAU005qY1ACU00rU1qAEPSmNTmprUANamtSt1ppoARqa1LTT1oARutMPWnU00ANpppx6U1ulADaRulLSNQA1qa1ObrTD1oAKKa3WigBVpy0wdadQA9actMHWnrQAtOHSm0q0APFOFMWnLQA8U5etNFOFADqcOtNpwoActPWmCnCgB605aYKdQA9actMp1AD1pabTqAFU0oNNpVNADwadTAaUGgCQGlBplOBoAeDS5pmaXNAD80uaZmjNAD80ZpuRRmgB2aTNJkUmaAFzRmm5ozQAE0hNJmkJoACaQmgmm0ABNNNBNNJoAKKKRjQAhpppWprUAIaaaVqa1ACGmmlamtQAhpp6UrU1qAEpp6UrU1qAEbpTGpzUxqAEamtSmm0AFNPWnU00ANNNpx6U00ANooooABTqYtOWgB4pwpi05aAH0Ui0t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";
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element.on('error', function() {
                element[0].src = attr.fallbackSrc ? attr.fallbackSrc : missingDefault;
            });
        }
    };
});

commonDirectives.directive('loadingSrc', function() {
    var loadingDefault = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAASAAAATgAAAAAAAABgAAAAAQAAAGAAAAABUGFpbnQuTkVUIHYzLjUuMTEA/9sAQwAEAgMDAwIEAwMDBAQEBAUJBgUFBQULCAgGCQ0LDQ0NCwwMDhAUEQ4PEw8MDBIYEhMVFhcXFw4RGRsZFhoUFhcW/9sAQwEEBAQFBQUKBgYKFg8MDxYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYW/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+ggKcBQBRQAUAZpQKUUAFOAxRSgUAIBThQBTqAAClAoApwFACU4CilAoAQCnYoxTsUAJilpcUtACYpaXFLQAmKXFLiloAbilxTsUuKAG0YNOowaAExS4FLilxQA2inYooAbRg07BpcGgBmDRg0/FGKAGYNFPxSYNADaKdg0UANxSYp+BSYoAbikwafikoAbikxT6TFADMUYp2KMUAR4oxT8UmKAGYpMU/FJigCPFJin4pMUAMpCKfSEUAMIppFSEU2gBhFIRTyKaRQAykIp9NoAaRmm08ikNADaQilooAbiilxRQAtKBSAZpwoABTqKUCgAApwFAFKKAACnAUU4CgBAKUClApQKAClApaUCgBMU7FGKdigBMUuKUClxQAmKXFLiloATFLS4paAG4NLinYpcUANpcUtLigBuKXAp2KKAG0YNOooATFGKWigBMUYpaKAExRilooATBpMGnUUANowKdRigBmKTBp+KMUAMxSYp9JigBlGKdijFADMUmKdiigBmKTFPxSYoAjxSYp+KTFADKQin00igBpFNxTyKQigCMikIp5FIRQAwim08ikNAEZGKQin00jFADTTaeRSEUANooooAdTqAMUoFAABTgKAKUUAAFOopwoAAKUCgCnAUAAFLQBTqADGKUClApQKAEApwFFOAoATFLRinAUAJilpcUuKAExS0uKWgBMUuKKKACijBpcUAJRTqMGgBMGjFOxRigBuKXAp2BRigBuBRgU6igBuBSYp9GBQAzFGKfgUmKAGYNFPxSYoAbRTsUmKAEpMUtFADcUYp1GKAI8UYp+KTFAEeKMU7FJigBmKQin0hFADKaRipCKaaAGEUhFPIpCKAI6aRUlNNADCKQjNPIppFADCKbUhFNNAEZGKQinn0ptADaKXFFACgU4CgU4UAAp1ApwFAAKUChRTgKAAClAzQBmnAUAFOFAFOAoAQClApQKWgApQKUClAoAQCnYop2KAExS0UUAFFLiloATFLS4paAExS4pcUuKAG0uKXBpcUANxS4FOxRigBtFOowaAG0U7BowaAG0U7BowaAG4oxTqMCgBmKTBp+KMUAMpMU+kxQAzBoxTsUYoAZikp+KSgBtGKXFJQA0ikxT6QigBlNIqTFNIoAaRTaeRSUARkUhFPIpCKAGEZptPIpCKAIzSEU+mmgBjCmkU8jFIwoAYRmmmnsKawoAZRTqKAHAUqihRTgKABR3pyikApwoAUClAoFOoAKcBQKcBQAAYpQKAKWgApwFFOAxQAgFOAoApaACiilAoAAKWgCnUAJilxS4paAExS4pcUuKAExS0uKWgBuDS4p2KMUAJgUU6igBuDS4pcGlwaAG4oxTsUYoAbijBp2KTBoAbg0U7BooAbgUmKfikxQAzFGKdg0YoAZikxT8UlADMUmKfikoAZikxTyKQigCOinUhFACYzTadRQAwimkU8jFIRQAymkYp5FJQAwimkU8jFIRQAwjNNNPYU0igBh9KaakIppoAjPFNIqQ02gBmKKWigBwp1ApVoAUU4UiinKKAFHFOApFFOUUACinAUgFOoAKdQBTgMUAAGKUCgCloAKKAM07FAAKUClAxSgUAJinUAU7FACYpaXFLQAYoxTsUUAJilpcUtADcGlxTsUYoATFGDTqMGgBMGjFOxRigBuKMU7FGKAG4oxTsUYoAZg0U/FJg0ANxSYp+KTFADKKdg0YoAZikp+KSgBmKSn4pKAIyKQin4pCKAGU0ipKaRigBhFJTyKQigBtNIxTqKAGEU0inkYpCKAGU008ikoAjIxSMKeaaaAGMKawp5ppFADGFNanmmmgBtFLiigBRThQKcKAAU4UCnCgAFOFApwoAKcBSKKcooAAKcooApaACgDNFOHpQAU4UClAoAAKcBQBSgZoAAKcBRinAUAIBS0YzTsUAJilpcUtACYpaXFLigBMUuKXFLigBuKXFLg0uKAG4pcCnYoxQA3AowKdRQA3ApMU+jAoAZijBp2KMUAMpMU/FGKAI8UYp+KTFADMUmKfikxQBHiinYpMUAMxSEU+kIoAYRTSKkIptADCKaRTzSEUAMIzTaeRSEUANppp1FAEZFIwp9NNADSKaacaRhQAw0009qa1ADDTTT29aa1ADKKdiigBVpy0lOoAVactIKcKAFWlFFOFAAKcKBThQAUUUq0AKKcBikUU5RQAAU4ChRSgZoAUClAoAp1ABSgUAUoFAAKcBRTgKAEApaUCloATFLilxS4oATFLS4pcUAJijFOxS4oAbiinUYNADaKdg0YNADaKdg0YNADcCkxT8UmKAGYNGKfikoAZikp+KSgBmKTFPxSEUAR4pCKeRSEUAMptSEZptADCKQinEYpCKAGEU01IRTaAIyKRhT6aaAGMKSnGmmgANNNOpGoAYabT2prUAMNNNPamtQAw0009qa1ADKKdRQAq05aSnCgBVpy0gp1ACrTlpKcKAFWloooAVaUUU4UAApwoFOFAAKcPSgU4CgApQKFFKBQAoFKKBTgKAClApQKUCgAApaAKdQAmKXFLilxQAYoxTsUYoATFLilxS0ANwaXBpaKAExRilooATFJg06igBtGKdRigBmKSn4pKAGYpKfikoAZikxT8UhFAEZFIRTzTSKAGEUhp5FNIoAZTSMVIaaaAGEUhFOpGFADDTTT2pretADDTae1NagBlFK1JQA00009qa1ADKaae1IaAIzTTUjUxqAGUU6igBVpy0gp1ACrTlpKcKAFWnLSU6gApVpKdQAq05aQU4UAKtOX1pBThQAq0o5opwoABTqBThQAU4CkApwFAABTgKAKUDNAABTqKcBQAgFLilApaADFFFFABRS4paAG4NLinYNGKAG4oxTsUYoAbijBp2KMUAMop2DRigBtFLikoATFJTqKAGEU0inkUhFADCKaakIzTaAGEU0inkU0jFADGFIRTiKRhQAwim09qa3rQAw001IaaaAIzTTUhppoAjNNNSNTWoAbTTTqRqAGU2ntTWoAYaaae1NagBlFOxRQALT1pq09elAAKetNWnrQAq0tA6UUAKtOWkFOFACrTlpBThQA5actNFOoAVactJTqAFWnLSU4UAKopQKKdQACnUCnCgAFKBQBS0AFFFOAoAQClxSgUuKAExS4p2KMUAJijFOxS4FADcCjAp1FADcCkxT6MUAMxSU/FJQAzFJT8UlADCKSnEUhFACUhFLRQAwikIp5FNYUAMNNp7CmtQAymmntSNQBGaaakamtQBHSNTmpDQAxqYakNNNAEZppp7U1qAGUUrUlADTTTT2prUAMpppx60jUAMooPWigB1Opq9acOtADqcKRactAC0L1opVoActOWkXpTh0oAVactIKcKAFWnLSU4UAKtOWkpwoAVactIKcKAFWnLSCnCgBVpyikFOoAKKKcKACnAUAUoFAABS4pQKWgAxRinYoxQAmKWnYooAbRg07BpcGgBlGKdg0UAMxSU/FJQAzFJTyKQigCMikIp9NIxQAwikp7CmsKAEppp1BoAjNNNSGmmgCM001IaaaAIzTTUhpjUAMNNp7U1qAGNTTT2prUAMNNp7U1qAGGm09qYetAA3SmNT6bQAxqa1PNNoAbRRRQAq05aRelOXpQAq09elNHSnUAFOFNFOHWgB1OHWkWnLQAq9aetNWnLQAq9aetNWnLQA5actIOlOFACrTlpBThQA5acKaKcKAHCiiigBVpy0gpwoAVRTgKQU4UAAFOFApwoAAKMUoFKBQAYowadijBoATFGKdijFADcGkp+KTFADMUlPxSUAMIpCKeRTWFADCKbTyKQigCM001IaaaAIzRTjTaAEamtT6aaAGNTGqQ0xqAGGmmntTWoAZTTT2pjdaAG00049aa3WgBpprdKcetNNADGprU8009KAG0jdaWkagBh602ntTW60AMNFK1FAC04U2nUAOp1NHWnUAKvWnLTVpy0AOWnr0pq9KcKAHDpTqbTqAHCnU0dacvWgBwpy9aRactADlpy01aevSgBVpy0gp1ABSrSU6gBVp600U4UAOFOFNFOWgBwrUt9GlkgSUTIN6hgCDxkVlrXU27FNHjdeqwAj/vmgDN/sOX/nun5Gl/sSX/AJ7p+RqMaxdntH/3zS/2vd+kf/fNAEn9iy/89k/I0f2LL/z2T8jTP7WuvSP/AL5pf7Vu/SP/AL5oAf8A2NJ/z2X8jR/Y0n/PZPyNN/tW6/6Z/wDfNH9qXXon/fNADv7Fl/57L+RpP7Gl/wCeyfkab/at1/0z/wC+aT+1br0j/wC+aAHf2LL/AM9k/I0f2JL/AM90/I03+1rv0j/75pP7Xu/SP/vmgB39hzf890/I1W1LTXs4BK0isGbbgD2P+FWrPVLmW7jjYR7WYA4WrHij/kHp/wBdR/I0Ac81Nan000AMamtTzTTQBG1NNPamtQAlNbrTqRqAGGmmntTWoAYaaelOPWmmgBrdKY1Ppp6UAMamtTm6UjdKAGNTW605qa1ADD1ptPamHrQA2hulFBoAY1Nant0pjUAJRRRQAU5etNHWnr1oActLSLS0AKtPXpTV6U4UAOp1Npw60AOXrTh1pFpy9aAHL1py01actADlp69KavSnDpQA4dKdTacOtADh1p1IvWloAB1p69aatOWgBy05aatPHSgBVp602nUAOFdNH/yBF/69x/6DXMjrXTR/8gVf+vcf+g0Ac6KcKRaUUAOjQuwVQST0ArVs9LULvuT/AMBB/mafpsEdna/aZ/vEZ+g9PrVK9vJbliM7U7KP60AaIn0+3O1TGp/2Rn9RThf2bceYPxU1i4ooA2pLOzuEyqrz/ElZeoWElv8AMPnj/vDt9aZBLJC++Jip7jsa2bG5S7hOQNw4dTQBzp4pGq9q1p9nmyg/dv8Ad9vaqVAEmm/8hCH/AK6D+danij/kHp/11H8jWZpv/IQh/wCug/nWn4o/5B6/9dR/I0AYDU1qe3SmNQAw9aaae1NagBlNPSnN1ppoAbQelFFADW6UxqeelNbpQAxqa3WnNTWoAYetNp7daYetADT0ptOptADW6Uxqeaa3SgBjU1qc1NagBjdaKVqSgBtNbpTjTT0oAbRRRQAL1p60xetPWgBy0tItLQA5elOpq9KdQA6nL1ptOXrQA9actNWnLQA5actNWnLQA9elOpq9KdQA6nL1ptOXrQA9aWkWloAVactNWnLQA9elOpq9KdQA6nL1po609aAHLXSx/wDIFX/r3H/oNc0tdLH/AMgVf+vcf+g0Ac8tWdLi868RD0zk/QVXXpV/w7/x/H/cP9KAJNdnLXAhB+VOv1qkKddktdSE/wB8/wA6bQA4CiilJoAawqSymMF0smeM4b6VG1NagDd1OITWTrjJA3L9RXOnrXT253W6HPVR/Kuak4kIHrQA/Tv+QhD/AL4rU8Tf8eCf9dR/I1maf/yEIf8AfH860/E3/Hgn/XUfyNAGAaa3SnGmnpQAxqa1OamtQA1qY3WntTG60ANooooAbTW6U401ulADGprU5qa1ADWpjdae1MbrQA2m06m0ANprdKdTW6UAMamtTmprUANakpWpKAG02nU2gBtFFFAAvWnrTKcvWgB60tItLQA5elOpi9KeOlADqcvWm04daAHrTlpq9aVetAD1py01actAD16U6mLTx0oAdTl602nCgB60tNXrTqAFWnLTV605aAHr0pwpi09elADqcOtNHSnUAPWulj/5Aq/9e4/9BrmRXTR/8gVf+vcf+g0Ac8tXdEkEeoLno2VqiKepKsGBwQcg0AWdSj8u+kX1bI/HmolNX7oC+s1uY/8AWRjDrWeDQA8GjNNzRmgBSaaaM0sal2wOB1J9BQBILi4S38tZWCt29qrU+ZgW+Xp0A9qYaAJdO/5CEP8AvitTxN/x4J/11H8jWVpv/IQh/wCug/nWp4o/5B6f9dR/I0AYJprdKVqa1ADWprU5qa3WgBrUw9acetNoAbRRRQA2mt0px6UxqAGtTWpzU1qAGtTG605utNNADabTqbQA2mt0px6U1ulADGprU5qa1ADWpKG60UANptONNbpQA2iiigApw602nUAPXrS00dadQAq09elMWnLQA8dKdTV6U4dKAHDrThTadQA5etPWmU4daAHrTlpq9actAD16U4UxactAD6dTV6U4UAFOHWm04UAPWnLTBTqAHrTlplOFAD1rp4/+QGv/AF7j/wBBrlxXURc6IuP+fcf+g0Ac4tOBo8qX/nm//fJpfLl/55v/AN8mgCWzuJLaXfGfqD0NXGjtr354HEMp6o3Q/SqAjk/55t/3zR5cn/PNv++aAJ5rW5iOGhb6gZH6UwRyngRsf+AmnRyXkYwjTADtzStPfN1eb9aAD7M6jdOwiX/a+9+VMmlXb5cQ2p3z1b60xklJyUc/gaTy5P8Anm3/AHzQA2mk08xy/wDPNv8AvmkMcv8Azzf/AL5NAEmm/wDIRh/66D+danij/kHp/wBdR/I1mabHINQhJjYfOO1afir/AJB6f9dR/I0Ac+aaacaa1ADTTaVqa1ACGmnpStTWoAShulFI1ADWprU5qYetACNTG60402gBpptOPSmt0oAaelNPSlamt0oARulManNTWoAa1NbrTm60w9aAGnrRRQelADT0prdKc3SmNQAlFFFAAKcOlMXpTloAfTqavSnDpQAL1p60ynCgB605aYOtPWgB69KcOlMWnLQA8dKcKYtOWgB9OFMWnigBw609aYKcKAHrTlplOoAdSrSUUAPWnLTKcKAHrTlNMFOBoAeproLPVLOOzijaRtyxqD8p6gVzwNKDQB0v9rWP/PVv++DS/wBrWX/PRv8Avk1zQNOzQB0f9q2X/PRv++TR/atl/wA9G/75Nc7mlzQB0X9qWf8Az0b/AL5NH9qWf/PRv++TXO5NGTQB0X9qWf8Az0b/AL5NJ/atl/z0b/vk1z1GaAOh/tWy/wCejf8AfJpP7Wsf+ejf98mudzQTQB0X9rWP/PRv++DVHXr+2ubNY4XJYSAnKkcYP+NZOaaTQAE000pNNY0AIaaaVjTWoAQ02lakoAKaac1MagBKaaVqa1ACHpTGpzU1qAGtTWpW6000AI1Nalpp60AI3WmHrTqaaAG00049Ka3SgBtI3SlpGoAa1NanN1ph60AFFNbrRQAq05aYOtOoAetOWmDrT1oAWnDpTaVaAHinCmLTloAeKcvWminCgB1OHWm04UAOWnrTBThQA9actMFOoAetOWmU6gB60tNp1ACqaUGm0qmgB4NOpgNKDQBIDSg0ynA0APBpc0zNLmgB+aXNMzRmgB+aM03IozQA7NJmkyKTNAC5ozTc0ZoACaQmkzSE0ABNITQTTaAAmmmgmmk0AFFFIxoAQ000rU1qAENNNK1NagBDTTStTWoAQ009KVqa1ACU09KVqa1ACN0pjU5qY1ACNTWpTTaACmnrTqaaAGmm049KaaAG0UUUAAp1MWnLQA8U4UxactAD6KRaWgBw605aaKcKAHrTlpgpwoAetOWmU6gB605aYKcKAHrTlpgpwNAD1py0wU4GgB4NKDTAacpoAfRSA0tACg04GmUoNAD807NRg07NAD80uaZmlzQA7Jpc0zNLmgB2aM03NGaAHZozTc0ZNAC5pM0maTNAC5pCaTNJmgBSaaTRmmk0AKTSUUUABppNFNJoAKbQTSMaAEptKxprGgBDTTStTWoASm0rU1qAENNpWprUAIaaaVqa1ACHpTaVqSgBGprUrdaaaAEamtS009aAEJopKKAAU4U1acKAHU4U0U5aAHCnU0U4UAKtOWmU4UAPWnLTBThQA9actMFOFADhThTRSrQA8U4GmKacpoAeDTgaYppQaAJAacDUYNOoAeDTgaYDSg0APopoNOzQAZp2abRQA7NLmmZpc0APoyabmjJoAfmjNMyaMmgB+TSZNNyaM0AOzSZpM0maAFzSZpKKACiikJoAXNNoJppNAATSE0E00mgAY0hNBNNoACaaTRTSaAA000GmmgApppWprUAIabStTWoAQ02lamtQAlFFI1ACGmt0pWprUAIaaaVqa1ACUUhNFACLT1pgpwoAetKKaKdQA4U9aYKcKAHUq0gooAetOU0wU4GgBwNOFMU05TQA8U6mKacpoAeKcDUdOoAeDTlNMBpQaAJAaUGmA0oNAEgNKDTKXNAD807NR5p2aAH5paZmlzQA6im5NLmgBaKMiigAzRmiigAooooAKKMikzQAtGabmkzQAuaTNJmkzQAtNJopCaAAmkJoJptABTSaCaQmgAJprGgmkJoARjSGimmgANNNBNNNAAaaaCaRjQAhptK1JQAU00rU1qAENNpWprUAJTaVqa1ACUUmaKABactMFOFAD1py0wU4UAOFOFNFKtADwadTFpymgBacKbSqaAH04VGDTgaAJAacDUYNOoAeppQaaDSg0APpwNRg04GgB4NKDTQaUGgB9KDTM07NADs07NR5p2aAH5pc1HmlzQA/NLmmZpc0APzRmmZpcigB2aM+9NyKMigB2aMim5FJmgB2aM03NJk0AOpM0maTNAC5pM0maTNAC0hNJSE0AKTTaCaaTQApNNJoJpCaAAmm0UhNACE0jGhjTSaABjTWNKTTSaAEY0hNBNNoAKDRTSaAA000GmmgAptK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";
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element[0].src = attr.loadingSrc ? attr.loadingSrc : loadingDefault;
            var img = angular.element('<img />');
            img.src = scope.ngSrc;
            img.on('load', function() {
                element[0].src = img.src;
            });
        }
    };
});

commonDirectives.directive('youtubePlayer', function($window, youtubePlayerService) {
	  return {
		    restrict: "E",
//		    replace: true,
		    scope: {
		      height: "@",
		      width: "@",
		      videoid: "@"
		    },

		    template: '<div></div>',

		    link: function(scope, element, iAttrs) {
		       scope.randomString = function(len, charSet) {
				    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				    var randomString = '';
				    for (var i = 0; i < len; i++) {
				    	var randomPoz = Math.floor(Math.random() * charSet.length);
				    	randomString += charSet.substring(randomPoz,randomPoz+1);
				    }
				    return randomString;
				}
				
				if(!iAttrs.id){
					var randomValue = scope.randomString(5);
					iAttrs.$set('id',randomValue);	
				}
				
				if(youtubePlayerService.ready){
					youtubePlayerService.loadPlayer(iAttrs.id, {
				          playerVars: {
				            autoplay: 1,
				            html5: 1,
//				            theme: "light",
				            modesbranding: 1,
//				            color: "white",
				            iv_load_policy: 3,
				            showinfo: 1,
				            controls: 2
				          },
				          height: scope.height,
				          width: scope.width,
				          videoId: scope.videoid});
				}else{
					youtubePlayerService.createPlayer(iAttrs.id, {
				          playerVars: {
				            autoplay: 1,
				            html5: 1,
//				            theme: "light",
				            modesbranding: 1,
//				            color: "white",
				            iv_load_policy: 3,
				            showinfo: 1,
				            controls: 2
				          },
				          height: scope.height,
				          width: scope.width,
				          videoId: scope.videoid});
				}
		      
		      scope.$watch('videoid', function(newValue, oldValue) {
		        if (newValue == oldValue) {
		          return;
		        }
		        if(youtubePlayerService.player){
		        	youtubePlayerService.player.cueVideoById(scope.videoid);
		        }
		      }); 

		      scope.$watch('height + width', function(newValue, oldValue) {
		        if (newValue == oldValue) {
		          return;
		        }
		        if(youtubePlayerService.player){
		        	scope.$apply(function(){
		        		youtubePlayerService.player.setSize(scope.width, scope.height);
		        	});
		        }
		      });
		    }  
		  };
 });


commonDirectives.directive('granslivePlayer', function(commonService, $window, $compile){
	return {
		restrict: 'EA',
        transclude: true,
        replace: false,
		scope: {
			'id': '@',
			'playerSources': '=',
			'playerConfig':'=',
			'videoData':'='
		},

		link: function (scope, iElement, iAttrs) {
			var player = null;
			var sources = [];
			var youtubeSource = null;
			var embedCode = null;
			var imageToShow = '/../images/granslive.png';
			var videoData = scope.videoData;
			var autoStart = true;
			scope.randomString = function(len, charSet) {
			    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			    var randomString = '';
			    for (var i = 0; i < len; i++) {
			    	var randomPoz = Math.floor(Math.random() * charSet.length);
			    	randomString += charSet.substring(randomPoz,randomPoz+1);
			    }
			    return randomString;
			}
			
			if(!iAttrs.id){
				var randomValue = scope.randomString(5);
				iAttrs.$set('id',randomValue);	
			}
			
			if(!scope.playerConfig.width){
				scope.playerConfig.width = window.innerWidth * 60 /100;
			}
			
			if(!scope.playerConfig.height){
				scope.playerConfig.height = scope.playerConfig.width * 60 /100;
			}
			
			console.log('IN GRANSLIVE PLAYER DIRECTIVE >>>>>>>>>>>>>>>>');
			scope.$watch("playerSources", function(newValue) {
				if(!commonService.isNullOrEmpty(scope.playerSources) && scope.playerSources.length > 0) {
					angular.forEach(scope.playerSources, function(eventSource){
						if(!commonService.isNullOrEmpty(eventSource.flashSource)){
							sources.push({file : eventSource.flashSource+"/"+eventSource.fileName});
						}
						if(!commonService.isNullOrEmpty(eventSource.html5Source)){
							sources.push({file : eventSource.html5Source+"/"+eventSource.fileName});
						}
						if(!commonService.isNullOrEmpty(eventSource.thirdPartySource)){
							sources.push({file : eventSource.thirdPartySource});
//							youtubeSource = eventSource.thirdPartySource;
						}
						if(!commonService.isNullOrEmpty(eventSource.embedCode)){
							sources.push({file : eventSource.embedCode});
							embedCode = eventSource.embedCode;
						}
					});
					
					if(videoData){
						if(videoData.imagePath){
							imageToShow = videoData.imagePath;
						}
						
						if(videoData.status == 'upcoming'){
							autoStart = false;
						}
					}					
					
					if(embedCode != null){
						$("#"+iAttrs.id).append(embedCode);						
					}else if(youtubeSource != null){
						$("#"+iAttrs.id).append('<div id="ytPlayer"></div>');
						var start = youtubeSource.indexOf('?v=') + 3;
						youtubeSource = "http://www.youtube.com/embed/"+youtubeSource.substr(start, start + 11);
						$("#ytPlayer").append('<iframe id="player" type="text/html" width="'+scope.playerConfig.width+'" height="'+scope.playerConfig.height+'" src="'+youtubeSource+'?enablejsapi=1&origin=http://www.granslive.com" frameborder="0"></iframe>');
					}else{
						playerReady = function(){
							$(".jwlogo").attr('width','120px');
						};
						
						if(scope.playerConfig.width > 864){
							scope.playerConfig.width = 864;
							scope.playerConfig.height = 483;
						}
						
						$compile(iElement.contents())(scope);
						
						player = jwplayer(iAttrs.id).setup({
					        playlist: [{
					            image: imageToShow,
					            sources: sources
					        }],
				            html5player: '/../jwplayer/jwplayer.html5.js',
				            flashplayer: '/../jwplayer/jwplayer.flash.swf',
//					        primary: "html5",
					        height: scope.playerConfig.height,
					        width: scope.playerConfig.width,
					        abouttext: 'GransLive - ' +videoData.title,
					        aboutlink: "http://www.granslive.com",
					        image: "/../images/granslive.png",
					        stretching: 'uniform',
					        autostart: autoStart,
					        skin: "/../jwplayer/beelden.xml",
					        logo: {
					        	file: "/../images/granslive.png",
					        	link: "http://www.granslive.com",
					        	width: "180px"
//					        	position: 'bottom-right'
					        },
					        sharing: {},
					        ga: {},
					        events:{
					      	  onReady: playerReady
					      	},
					      	aspectratio: "16:9"
					    });
					}
				}
				
			}, true);
			
			scope.$watch("playerConfig", function(newValue) {
				console.log('Player SHould resize: >>>> ');
					if(player != null){
						setTimeout(function(){
							player.resize(scope.playerConfig.width,scope.playerConfig.height);
							console.log(scope.playerConfig);
						}, 1);
					}else{
						if(youtubeSource != null){
							$("#ytPlayer").empty();
							$("#ytPlayer").append('<iframe id="player" type="text/html" width="'+scope.playerConfig.width+'" height="'+scope.playerConfig.height+'" src="'+youtubeSource+'?enablejsapi=1&origin=http://www.granslive.com" frameborder="0"></iframe>');
						}
					}
			}, true);
		}
	};
});

commonDirectives.directive('ngBindHtmlUnsafe', ['$sce', function($sce){
    return {
        scope: {
            ngBindHtmlUnsafe: '=',
        },
        template: "<div ng-bind-html='trustedHtml'></div>",
        link: function($scope, iElm, iAttrs, controller) {
            $scope.updateView = function() {
                $scope.trustedHtml = $sce.trustAsHtml($scope.ngBindHtmlUnsafe);
            }

            $scope.$watch('ngBindHtmlUnsafe', function(newVal, oldVal) {
                $scope.updateView(newVal);
            });
        }
    };
}]);


commonDirectives.directive('giftsWidget', ['$compile', function($compile) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) { // function content is optional
        	console.log('giftsWidget Start  ' +attrs.id);
        	var script = '<script charset="utf-8" type="text/javascript"> amzn_assoc_ad_type = "responsive_search_widget"; amzn_assoc_tracking_id = "gran09-21"; amzn_assoc_link_id = "Q4UDENI7AK2HHSR2"; amzn_assoc_marketplace = "amazon"; amzn_assoc_region = "IN"; amzn_assoc_placement = ""; amzn_assoc_search_type = "search_widget"; amzn_assoc_width = "auto"; amzn_assoc_height = "auto"; amzn_assoc_default_search_category = ""; amzn_assoc_default_search_key = ""; amzn_assoc_theme = "light"; amzn_assoc_bg_color = "FFFFFF"; </script> <script src="//z-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1&MarketPlace=IN"></script>';
//          angular.element('<SCRIPT charset="utf-8" type="text/javascript" src="http://ws-in.amazon-adsystem.com/widgets/q?rt=tf_sw&ServiceVersion=20070822&MarketPlace=IN&ID=V20070822%2FIN%2Fgranslivecom-21%2F8002%2Fe0c3e41e-278d-478c-ac0c-ee22705ceada"> </SCRIPT>').appendTo(element);
//        	angular.element($compile(script)(scope)).appendTo(element);
//        	element.html('<script charset="utf-8" type="text/javascript"> amzn_assoc_ad_type = "responsive_search_widget"; amzn_assoc_tracking_id = "gran09-21"; amzn_assoc_link_id = "Q4UDENI7AK2HHSR2"; amzn_assoc_marketplace = "amazon"; amzn_assoc_region = "IN"; amzn_assoc_placement = ""; amzn_assoc_search_type = "search_widget"; amzn_assoc_width = "auto"; amzn_assoc_height = "auto"; amzn_assoc_default_search_category = ""; amzn_assoc_default_search_key = ""; amzn_assoc_theme = "light"; amzn_assoc_bg_color = "FFFFFF"; </script> <script src="//z-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1&MarketPlace=IN"></script>');
//        	element.html('<h5>Gifts 123</h5>');
//        	$("#"+attrs.id).append($compile(script)(scope));
        	element.html(script);
//        	$("#"+attrs.id).append(script);
        }
    }
    
}]);

commonDirectives.directive('amazonGifts', function($q, $window){
  function load_script(element) {
	  console.log('IN LOAD Amazon Shopping Widget Script ');
      var s = document.createElement('script'); // use global document since Angular's $document is weak
      s.async = true;
      s.src = 'http://ws-in.amazon-adsystem.com/widgets/q?rt=tf_sw&ServiceVersion=20070822&MarketPlace=IN&ID=V20070822%2FIN%2Fgranslivecom-21%2F8002%2Fe0c3e41e-278d-478c-ac0c-ee22705ceada';
      element.append(s);
//      document.body.appendChild(s);
//      element.appendChild('<h5>Send Gifts</h5><SCRIPT src="http://ws-in.amazon-adsystem.com/widgets/q?rt=tf_sw&ServiceVersion=20070822&MarketPlace=IN&ID=V20070822%2FIN%2Fgranslivecom-21%2F8002%2Fe0c3e41e-278d-478c-ac0c-ee22705ceada"> </SCRIPT>');
  }
  
  function lazyLoadApi(element) {
      var deferred = $q.defer();
      $window.initialize = function () {
          deferred.resolve();
      };
      // thanks to Emil Stenström: http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
      if ($window.attachEvent) {  
          $window.attachEvent('onload', load_script(element)); 
      } else {
          $window.addEventListener('load', load_script(element), false);
      }
      return deferred.promise;
  }
  return {
      restrict: 'E',
      transclude: true,
      replace: true,
      link: function ($scope, element, attrs) {
          console.log('Amazon Shopping Widget Added');
//          angular.element('<SCRIPT charset="utf-8" type="text/javascript" src="http://ws-in.amazon-adsystem.com/widgets/q?rt=tf_sw&ServiceVersion=20070822&MarketPlace=IN&ID=V20070822%2FIN%2Fgranslivecom-21%2F8002%2Fe0c3e41e-278d-478c-ac0c-ee22705ceada"> </SCRIPT>').appendTo(element);
          lazyLoadApi(element);
      }
  }
  
  
});

return commonDirectives;

});

