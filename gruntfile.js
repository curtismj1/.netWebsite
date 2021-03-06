// This file in the main entry point for defining grunt tasks and using grunt plugins.
// Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409

'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: 'app',
        dist: 'dist',
        wwwroot: 'wwwroot',
        includes: 'includes',

        sass: {
            dist: {
                options: {
                    style: 'expanded', // expanded or nested or compact or compressed
                    loadPath: '<%= app %>/bower_components/foundation/scss',
                    compass: true,
                    quiet: true
                },
                files: {
                    '<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
                }
            }
        },
		

        jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
            all: [
                'gruntfile.js',
                '<%= app %>/js/**/*.js'
            ]
        },

        clean: {
            dist: {
                src: ['<%= dist %>/*']
            },
            bower: {
                src: ['<%= app %>/bower_components/*', '<%= wwwroot %>/lib/*']
            },
		},
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd:'<%= app %>/',
                    src: ['fonts/**', '**/*.html', '**/*.cshtml', '!**/*.scss', '!bower_components/**'],
                    dest: '<%= dist %>/'
                },{
                    expand: true,
                    cwd: '<%= app %>/',
                    src: ['fonts/**', '!**/*.scss', '!bower_components/**'],
                    dest: '<%= wwwroot %>/dist/'
                },{
					expand: true,
					flatten: true,
					src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
					dest: '<%= dist %>/fonts/',
					filter: 'isFile'
				},{
                    expand: true,
                    flatten: true,
                    src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
                    dest: '<%= wwwroot %>/dist/fonts/',
                    filter: 'isFile'
                }]
            },
            wwwroot: {
                files: [{
                    expand: true,
                    cwd: '<%= dist %>/',
                    src: ['css/**'],
                    dest: '<%= wwwroot %>/dist/'
                },{
                    expand: true,
                    cwd: '<%= dist %>/',
                    src: ['js/**'],
                    dest: '<%= wwwroot %>/dist/'
                },{
                    expand: true,
                    cwd: '<%= dist %>/',
                    src: ['**/*.cshtml', '!**/*.scss', '!bower_components/**'],
                    dest: '<%= includes %>/'
                }]
            },
            app_files: {
                files: [{
                    expand: true,
                    cwd:'<%= app %>/',
                    src: ['css/**'],
                    dest: '<%= wwwroot %>/'
                }, {
                    expand: true,
                    cwd: '<%= app %>/',
                    src: ['js/**'],
                    dest: '<%= wwwroot %>/'
                },{
                    expand: true,
                    cwd: '<%= app %>/',
                    src: ['fonts/**', '!**/*.scss', '!bower_components/**'],
                    dest: '<%= wwwroot %>/'
                },{
                    expand: true,
                    cwd: '<%= app %>/',
                    src: ['**/*.cshtml', '!**/*.scss', '!bower_components/**'],
                    dest: '<%= includes %>/'
                },{
                    expand: true,
                    flatten: true,
                    src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
                    dest: '<%= wwwroot %>/fonts/',
                    filter: 'isFile'
                }]	
            },
            bower: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/',
                    src: ['**/**/*.css', '**/**/*.js', '**/**/*.map', '**/**/*.scss', '**/fonts/**', '!**/**/*.min.css', '!**/**/*.min.js', '!**/**/*runtfile.js', '!**/**/package.js', '!**/src/**'],
                    dest: '<%= app %>/bower_components'
                },{
                    expand: true,
                    cwd: 'bower_components/',
                    src: ['**/**/*.css', '**/**/*.js', '**/**/*.map', '**/**/*.scss', '**/fonts/**', '!**/**/*.min.css', '!**/**/*.min.js', '!**/**/*runtfile.js', '!**/**/package.js', '!**/src/**'],
                    dest: '<%= wwwroot %>/lib/'
                }]
            },
        },

        imagemin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= app %>/images/',
                    src: ['**/*.{jpg,gif,svg,jpeg,png}'],
                    dest: '<%= dist %>/images/'
                }]
            }
        },

        uglify: {
            options: {
                preserveComments: 'some',
                mangle: false
            }
        },

        useminPrepare: {
		    html: ['<%= app %>/index.html'],
            cshtml: ['<%= app %>/index.cshtml', '<%= app %>/_header.cshtml', '<%= app %>/_footer.cshtml'],
			options: {
				dest: '<%= dist %>'
			}
		},

        usemin: {
		    html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
            cshtml: ['<%= dist %>/**/*.cshtml', '!<%= app %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['sass']
            },
            sass: {
                    files: '<%= app %>/scss/**/*.scss',
                    tasks: ['sass']
            },
            livereload: {
                files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            app: {
                options: {
                    port: 9000,
                    base: '<%= app %>/',
                    open: true,
                    livereload: true,
                    hostname: '127.0.0.1'
                }
            },
            dist: {
                options: {
                    port: 9001,
                    base: '<%= dist %>/',
                    open: true,
                    keepalive: true,
                    livereload: false,
                    hostname: '127.0.0.1'
                }
            }
        },

        wiredep: {
            html: {
                src: ['<%= app %>/**/*.html'],
                ignorePath: '../',
                exclude: [
				    'modernizr',
				    'font-awesome',
				    'jquery-placeholder',
				    'foundation'
                ]
            },
            cshtml: {
                src: ['<%= app %>/**/*.cshtml'],
                fileTypes: {
                    html: {
                        block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                        detect: {
                            js: /<script.*src=['"](.+)['"]>/gi,
                            css: /<link.*href=['"](.+)['"]/gi
		                },
                        replace: {
                                js: '<script src="~/lib{{filePath}}"></script>',
                                css: '<link rel="stylesheet" href="~/lib{{filePath}}" />'
                        }
                    }
                },

                ignorePath: '../bower_components',
                exclude: [
                    'modernizr',
                    'font-awesome',
                    'jquery-placeholder',
                    'foundation'
                ]
            }
        }

    });

    
    grunt.registerTask('compile-sass', ['sass']);
    grunt.registerTask('bower-install', ['wiredep', 'clean:bower', 'copy:bower', 'compile-sass', 'copy:app_files']);
    
    grunt.registerTask('default', ['bower-install', 'connect:app', 'watch']);
    grunt.registerTask('validate-js', ['jshint']);
    grunt.registerTask('server-dist', ['connect:dist']);
    grunt.registerTask('copy-bower', ['copy:bower']);
    grunt.registerTask('copy-app-files', ['copy:app_files']);
    
    //grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin', 'copy:wwwroot']);

    // The following line loads the grunt plugins.
    // This line needs to be at the end of this this file.
    grunt.loadNpmTasks('grunt-bower-task');

};
