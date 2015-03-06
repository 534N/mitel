
'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['gruntfile.js', 'app.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: [ 'app/server/views/*.jade' ],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['app/public/stylesheets/css/*.css',],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: ['app.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'app/public/main.js': [
                        'app/public/app/bower_components/jquery/dist/jquery.min.js',
                        'app/public/app/bower_components/velocity/velocity.min.js',
                        'app/public/app/bower_components/moment/min/moment-with-locales.min.js',
                        'app/public/app/bower_components/angular/angular.min.js',
                        'app/public/app/bower_components/angular-route/angular-route.min.js',
                        'app/public/app/bower_components/angular-animate/angular-animate.min.js',
                        'app/public/app/bower_components/angular-resource/angular-resource.min.js',
                        'app/public/app/bower_components/lumx/dist/js/lumx.js'
                    ]
                }
            }
        },
        cssmin: {
            my_target: {
                files: {
                    // 'app/public/main.min.css': [
                    //     'app/public/app/bower_components/lumx/dist/css/lumx.css',
                    //     'app/public/stylesheets/css/style.css'
                    // ]
                }
            }
        },
        nodemon: {
            dev: {
                script: 'bin/www',
                options: {
                    args: [],
                    ignore: ['app/public/app/bower_components/**'],
                    ext: 'js',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            task1: ['uglify', 'cssmin'],
            task2: ['nodemon', 'watch'],
            task3: ['jshint'],
            options: {
                logConcurrentOutput: true
            }
        },
        express: {
            options: {
                // Override the command used to start the server.
                // (e.g. 'coffee' instead of the default 'node' to enable CoffeeScript support)
                cmd: process.argv[0],
                // Will turn into: `node path/to/server.js ARG1 ARG2 ... ARGN`
                args: [ ],
                // Setting to `false` will effectively just run `node path/to/server.js`
                background: true,
                // Called when the spawned server throws errors
                fallback: function() {},
                // Override node env's PORT
                port: 3000,
                // Override node env's NODE_ENV
                NODE_ENV: undefined,
                // Consider the server to be "running" after an explicit delay (in milliseconds)
                // (e.g. when server has no initial output)
                delay: 0,
                // Regular expression that matches server output to indicate it is "running"
                output: '.+',
                // Set --debug
                debug: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['concurrent']);
};