
console.log('\n\n<<<<<<<<< INSIDE main.js >>>>>>>>>');

require.config({
//	waitSeconds: 200,
//	baseUrl: 'scripts/',
    paths :{
    	'jquery' : 'js/utils/jquery/jquery',
        'angular' :'js/vendor/angular/angular.min',
        'angularRoute' : 'js/vendor/angular-route/angular-route.min',
        'angularResource' : 'js/vendor/angular-resource/angular-resource.min',
        'angularLocalStorage' : 'js/vendor/angular-local-storage/dist/angular-local-storage.min',
        'angularAnimate' : 'js/vendor/angular-animate/angular-animate.min',
        'angularFilesystem': 'js/vendor/angular-filesystem/src/filesystem',
        'angularToastr': 'js/vendor/angular-toastr/dist/angular-toastr.tpls.min',
        'angularCookies' : 'js/vendor/angular-cookies/angular-cookies.min',
        'xeditable' : 'js/vendor/angular-xeditable/dist/js/xeditable.min',
        'angularMoment' : 'js/vendor/angular-moment/angular-moment.min',
        'angularGoogleAnalytics': 'js/vendor/angular-google-analytics/dist/angular-google-analytics',
        'cryptojslib' : 'js/vendor/cryptojslib/rollups/pbkdf2',
        'querystring': 'js/vendor/querystring/querystring.min',
        'mqtt':'js/vendor/paho-mqtt/src/mqttws31',
        'text': 'js/vendor/text',
        'greensock':'js/utils/jquery/greensock',
        'plugins':'js/utils/jquery/plugins',
        'themepunchPlugin':'js/utils/jquery/jquery.themepunch.plugins',
        'themepunchRevolution':'js/utils/jquery/jquery.themepunch.revolution',
        'layersliderTransitions':'js/utils/jquery/layerslider.transitions',
        'jqueryLayerslider':'js/utils/jquery/jquery.layerslider',
        'base64':'js/utils/base64',
        'sprintf':'js/utils/sprintf-0.6',
        'lscache':'js/utils/lscache',
        'spin':'js/utils/spin',
        'custom':'js/utils/custom'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularRoute' :{
            deps: ['angular']
        },
        'angularResource' :{
            deps: ['angular']
        },
        'angularAnimate' :{
            deps: ['angular']
        },
        'angularToastr': {
            deps: ['angularAnimate']
        },
        'angularLocalStorage' :{
            deps: ['angular']
        },
        'angularCookies' :{
            deps: ['angular']
        },
        'angularFilesystem' :{
            deps: ['angular']
        },
        'xeditable' :{
            deps: ['angular']
        },
        'angularMoment' :{
            deps: ['angular']
        },
        'angularGoogleAnalytics':{
        	 deps: ['angular']
        },
        'cryptojslib' : {
            exports : 'cryptojslib'
        },
        'querystring' : {
            exports : 'querystring'
        },
        'mqtt' : {
            exports : 'mqtt'
        },
        'jquery':{
        	 exports : 'jquery'
        },
        'greensock':{
        	exports : 'greensock'
        },
        'plugins':{
        	deps: ['jquery'],
        	exports : 'plugins'
        },
        'themepunchPlugin':{
        	deps: ['jquery','plugins'],
          	 exports : 'themepunchPlugin'
        },
        'themepunchRevolution':{
        	deps: ['jquery','plugins'],
           	exports : 'themepunchRevolution'
        },
        'layersliderTransitions':{
        	deps: ['jquery','plugins'],
          	exports : 'layersliderTransitions'
        },
        'jqueryLayerslider':{
        	deps: ['jquery','plugins'],
           	exports : 'jqueryLayerslider'
        },
        'base64':{
          	 exports : 'base64'
        },
        'sprintf':{
         	 exports : 'sprintf'
        },
        'lscache':{
         	 exports : 'lscache'
        },
        'spin':{
         	 exports : 'spin'
        },
        'custom':{
        	deps: ['jquery'],
        	exports : 'custom'
       }        
    },
    priority:
    	[
           'jquery',
	       'angular',
	       'cryptojslib',
	       'querystring',
	       'mqtt'
	   ],
   deps: [
          'initialize'
          ]
});

/*
require(['require','angular','bootstrap','app'], function () {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['myworkstyle']);
    });
});
*/
