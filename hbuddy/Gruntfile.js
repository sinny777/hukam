module.exports = function(grunt) {

    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: { }
        },
    	copy: {
        	manifestprod: {
	        	src: 'environments/production/manifest.yml',
	        	dest: 'manifest.yml'
        	},
        	configlocal: {
	        	src: 'environments/local/config.js',
	        	dest: 'client/scripts/config.js'
        	},
        	configprod: {
	        	src: 'environments/production/config.js',
	        	dest: 'client/scripts/config.js'
        	}
    	},
        requirejs: {
            compile: {
                options: {
                    uglify2: {
                        mangle: false
                    },
                    baseUrl: "client/scripts",
                    out: 'client/scripts/webapp.min.js',
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
        nodemon: {
            dev: {
                script: 'server/server.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-bower-installer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('compile', ['requirejs:compile']);

    grunt.registerTask('local', ['bower:install', 'copy:manifestprod',  'copy:configlocal', 'compile']);
    grunt.registerTask('production', ['bower:install', 'copy:manifestprod', 'copy:configprod', 'compile']);

    grunt.registerTask('start', ['nodemon']);

    grunt.registerTask('default', ['local']);
};
