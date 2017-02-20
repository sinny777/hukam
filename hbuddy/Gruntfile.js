module.exports = function(grunt) {

    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: { }
        },
    	copy: {
        	local:{
        		files:[
        		       	{src: ['environments/local/manifest.yml'], dest: 'manifest.yml'},
        		       	{src: ['environments/local/client-config.js'], dest: 'client/scripts/config.js'},
        		       	{src: ['environments/local/server-config.js'], dest: 'common/config/config.js'}
        		       ]
        	},
        	office:{
        		files:[
        		       	{src: ['environments/office/manifest.yml'], dest: 'manifest.yml'},
        		       	{src: ['environments/office/client-config.js'], dest: 'client/scripts/config.js'},
        		       	{src: ['environments/office/server-config.js'], dest: 'common/config/config.js'}
        		       ]
        	},
        	production:{
        		files:[
        		       	{src: ['environments/production/manifest.yml'], dest: 'manifest.yml'},
        		       	{src: ['environments/production/client-config.js'], dest: 'client/scripts/config.js'},
        		       	{src: ['environments/production/server-config.js'], dest: 'common/config/config.js'}
        		       ]
        	}
    	},
        requirejs: {
            compile: {
                options: {
                    uglify2: {
                        mangle: false
                    },
                    baseUrl: "client/scripts",
                    out: 'client/assets/release/hukam.min.js',
                    optimize: 'uglify2',
                    mainConfigFile:'client/scripts/main.js',
                    logLevel: 0,
                    findNestedDependencies: true,
//                    fileExclusionRegExp: /^\./,
//                    inlineText: true,
                    include: ['main']
//                    exclude: ['config']
                }
            }
        },
        cssmin: {
	    	  options: {
	    	    mergeIntoShorthands: false,
	    	    roundingPrecision: -1,
	    	    keepSpecialComments: 0
	    	  },
	    	  minify : {
	              expand : true,
	              cwd : 'client/assets/css/',
	              src : ['*.css', '!*.min.css'],
	              dest : 'client/assets/release/css',
	              ext : '.min.css'
	    	  },
	    	  combine: {
	    	    files: {
	    	      'client/assets/release/theme1.min.css': [ 
	    	                                       'client/assets/release/css/tipsy.min.css',
//	    	                                       'cient/scripts/js/vendor/bootstrap/dist/css/bootstrap.min.css',
	    	                                       'client/assets/release/css/bootstrap-social.min.css',
	    	                                       'client/assets/release/css/style.min.css',
	    	                                       'client/assets/release/css/prettyPhoto.min.css',
	    	                                       'client/assets/release/css/animate.min.css',
	    	                                       'client/assets/release/css/magnific-popup.min.css',
	    	                                       'client/assets/css/weather-icons.min.css',
	    	                                       'client/assets/release/css/responsive.min.css'
	    	                                       ]
	    	    }
	    	  }
    	},
        nodemon: {
            dev: {
                script: 'server/server.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-bower-installer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('compile', ['requirejs:compile', 'cssmin']);

    grunt.registerTask('local', ['bower:install', 'copy:local', 'compile']);
    grunt.registerTask('office', ['bower:install', 'copy:office', 'compile']);
    grunt.registerTask('production', ['bower:install', 'copy:production', 'compile']);

    grunt.registerTask('start', ['nodemon']);

    grunt.registerTask('default', ['local']);
};
