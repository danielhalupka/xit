/*global module:false*/

module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-rename');
    // Project configuration.

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app_name: grunt.option('app_name'),
       
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'app_name',
                            replacement: '<%= pkg.name %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['index.html'], dest: 'temp/'}
                ]
            },
            appName: {
                options: {
                    patterns: [
                        {
                            match: 'app_name',
                            replacement: "<%= app_name %>"
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['app/package.json'], dest: './'}

                ]
            },
            environment: {
                options: {
                    patterns: [
                        {
                            match: 'environment',
                            replacement: function () {
                                return process.argv[2] || "default";
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['app/env.config.js'], dest: 'temp/'}
                ]
            },
            javascript: {
                options: {
                    patterns: [
                        {
                            match: 'app_name',
                            replacement: '<%= pkg.name %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['app/app.config.js'], dest: 'temp/'}
                ]
            }
        },
        copy: {
            html: {
                cwd: 'temp/', // set working folder / root to copy
                src: 'index.html', // copy all files and subfolders
                dest: 'build/<%= pkg.name %>/<%= pkg.version %>/', // destination folder
                expand: true // required when using cwd
            },
            javascript: {
                cwd: 'app/components', // set working folder / root to copy
                src: '**/*.html', // copy all files and subfolders
                dest: 'build/<%= pkg.name %>/<%= pkg.version %>/partials/', // destination folder
                expand: true // required when using cwd
            },
            view: {
                cwd: 'app/view', // set working folder / root to copy
                src: ['**/*.html', '*.html'], // copy all files and subfolders
                dest: 'build/<%= pkg.name %>/<%= pkg.version %>/view/', // destination folder
                expand: true // required when using cwd
            },
            mocks: {
                cwd: 'app/mocks', // set working folder / root to copy
                src: ['**/*'], // copy all files and subfolders
                dest: 'build/<%= pkg.name %>/<%= pkg.version %>/mocks/', // destination folder
                expand: true // required when using cwd
            },
            devJs: {
                cwd: 'temp/', // set working folder / root to copy
                src: '<%= pkg.name %>.js', // copy all files and subfolders
                dest: 'build/<%= pkg.name %>/<%= pkg.version %>/js/', // destination folder
                expand: true // required when using cwd
            }
        },
        concat: {
            dist: {
                options: {
                    separator: '\n\r',
                    banner: '/*\nMinified <%= pkg.name %> \n' +
                            'Author: Danijel Halupka \n' +
                            'Creation Date: <%= grunt.template.today("yyyy-mm-dd") %>' +
                            '\n */ \n'
                },
                src: [
                    'temp/env.config.js',
                    'app/dependencies/angular/angular.js',
                    'app/dependencies/angular-local-storage/angular-local-storage.js',
                    'app/dependencies/angular-cookies/angular-cookies.min.js',
                    'app/dependencies/angular-loader/angular-loader.min.js',
                    'app/dependencies/angular-sanitize/angular-sanitize.min.js',
                    'app/dependencies/angular-route/angular-route.js',
                    'app/dependencies/angular-touch/angular-touch.js',
                    'app/dependencies/angular-animate/angular-animate.js',
                    'app/components/**/*.js',
                    'temp/app.config.js'
                ],
                dest: 'temp/<%= pkg.name %>.js'
            }
        },
        clean: {
            yourTarget: {
                src: ['temp']
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'app/dependencies/'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %>  <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                src: ['temp/<%= pkg.name %>.js'],
                dest: 'build/<%= pkg.name %>/<%= pkg.version %>/js/<%= pkg.name %>.min.js'
            }
        }

    });

    grunt.registerTask('first-run', ['replace:appName']);
    grunt.registerTask('default', ['bower', 'replace:dist', 'replace:javascript', 'replace:environment', 'copy:html', 'copy:javascript', 'copy:view', 'concat', 'uglify', 'clean']);
    grunt.registerTask('dev', ['bower', 'replace:dist', 'replace:javascript', 'replace:environment', 'copy:html', 'copy:javascript', 'copy:view', 'copy:mocks', 'copy:devJs', 'concat', 'uglify', 'clean']);
    
};