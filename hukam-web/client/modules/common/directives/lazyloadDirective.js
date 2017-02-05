
define(['angular'], function (angular) {
    "use strict";

    var directive = function ($document, $window, $q, $rootScope) {
    	var d = $q.defer(),
        loadService = {
          load: function() { return d.promise; }
        };
        function onScriptLoad() {
          $rootScope.$apply(function() { 
//          	d.resolve($window.d3); 
          	console.log("custom.js LOADED SUCCESSFULLY >>>>>>>>>>>> ");
//          	pageLoadCompleted();
          });
        }
        var scriptTag = $document[0].createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.async = true;
        scriptTag.src = '/scripts/js/utils/custom.js';
        scriptTag.onreadystatechange = function () {
          if (this.readyState == 'complete') onScriptLoad();
        }
        scriptTag.onload = onScriptLoad;

        var s = $document[0].getElementsByTagName('body')[0];
        s.appendChild(scriptTag);

        return loadService;
    }
    
    directive.$inject = ['$document', '$window', '$q', '$rootScope'];
    return directive;
	
});

