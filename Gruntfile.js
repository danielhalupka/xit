module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-clean');
    var gruntconfig = grunt.config.get('gruntconfig');

    grunt.initConfig({
        is_classic: gruntconfig.is_classic,
        controller_name: gruntconfig.controller_name,
        module_name: gruntconfig.module_name,
        module_scope: gruntconfig.module_scope,
        directive_name: gruntconfig.directive_name,
        directive_tag: gruntconfig.directive_tag,
        filter_name: gruntconfig.filter_name,
        filter_param: gruntconfig.filter_param,
        model_name: gruntconfig.model_name,
        model_name_lowercase: gruntconfig.model_name_lowercase,
        components_location: gruntconfig.location,
        rename: {
            controller: {
                files: [
                    {src: [__dirname + '/temp/Controller.js'], dest: __dirname + "/temp/<%= controller_name %>Controller.js"}
                ]
            },
            model: {
                files: [
                    {src: [__dirname + '/temp/Model.js'], dest: __dirname + "/temp/<%= model_name %>Model.js"}
                ]
            },
            service: {
                files: [
                    {src: [__dirname + '/temp/Service.js'], dest: __dirname + "/temp/<%= model_name %>Service.js"}
                ]
            },
            filter: {
                files: [
                    {src: [__dirname + '/temp/Filter.js'], dest: __dirname + "/temp/<%= filter_name %>Filter.js"}
                ]
            },
            directive: {
                files: [
                    {src: [__dirname + '/temp/Directive.js'], dest: __dirname + "/temp/<%= directive_name %>Directive.js"},
                    {src: [__dirname + '/temp/directive.partial.html'], dest: __dirname + "/temp/<%= directive_tag %>.directive.partial.html"}
                ]
            }
        },
        replace: {
            directive: {
                options: {
                    patterns: [
                        {
                            match: 'directiveName',
                            replacement: '<%= directive_name %>'
                        },
                        {
                            match: 'directiveTag',
                            replacement: '<%= directive_tag %>'
                        },
                        {
                            match: 'module_scope',
                            replacement: '<%= module_scope %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: [__dirname + '/lib/templates/<%= is_classic %>/Directive.js'], dest: __dirname + "/temp/"}
                ]
            },
            filter: {
                options: {
                    patterns: [
                        {
                            match: 'filter_name',
                            replacement: '<%= filter_name %>'
                        },
                        {
                            match: 'filter_param',
                            replacement: '<%= filter_param %>'
                        },
                        {
                            match: 'module_scope',
                            replacement: '<%= module_scope %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: [__dirname + '/lib/templates/<%= is_classic %>/Filter.js'], dest: __dirname + "/temp/"}
                ]
            },
            partial: {
                options: {
                    patterns: []
                },
                files: [
                    {expand: true, flatten: true, src: [__dirname + '/lib/templates/<%= is_classic %>/directive.partial.html'], dest: __dirname + "/temp/"}
                ]
            },
            model: {
                options: {
                    patterns: [
                        {
                            match: 'model_name',
                            replacement: '<%= model_name %>'
                        },
                        {
                            match: 'model_name_lowercase',
                            replacement: '<%= model_name_lowercase %>'
                        },
                        {
                            match: 'module_scope',
                            replacement: '<%= module_scope %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: [__dirname + '/lib/templates/<%= is_classic %>/Model.js'], dest: __dirname + "/temp/"}
                ]
            },
            service: {
                options: {
                    patterns: [
                        {
                            match: 'model_name',
                            replacement: '<%= model_name %>'
                        },
                        {
                            match: 'model_name_lowercase',
                            replacement: '<%= model_name_lowercase %>'
                        },
                        {
                            match: 'module_scope',
                            replacement: '<%= module_scope %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: [__dirname + '/lib/templates/<%= is_classic %>/Service.js'], dest: __dirname + "/temp/"}
                ]
            },
            controller: {
                options: {
                    patterns: [
                        {
                            match: 'controller_name',
                            replacement: '<%= controller_name %>'
                        },
                        {
                            match: 'module_scope',
                            replacement: '<%= module_scope %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: [__dirname + '/lib/templates/<%= is_classic %>/Controller.js'], dest: __dirname + "/temp/"}
                ]
            }
        },
        copy: {
            controller: {
                cwd: __dirname + '/temp/',
                src: '<%= controller_name %>Controller.js',
                dest: '<%= components_location %>/<%= module_scope %>/<%= module_name %>/',
                expand: true
            },
            service: {
                cwd: __dirname + '/temp/',
                src: '<%= model_name %>Service.js',
                dest: '<%= components_location %>/<%= module_scope %>/<%= module_name %>/',
                expand: true
            },
            model: {
                cwd: __dirname + '/temp/',
                src: '<%= model_name %>Model.js',
                dest: '<%= components_location %>/<%= module_scope %>/<%= module_name %>/',
                expand: true
            },
            filter: {
                cwd: __dirname + '/temp/',
                src: '<%= filter_name %>Filter.js',
                dest: '<%= components_location %>/<%= module_scope %>/<%= module_name %>/',
                expand: true
            },
            directive: {
                cwd: __dirname + '/temp/',
                src: ['<%= directive_name %>Directive.js', '<%= directive_tag %>.directive.partial.html'],
                dest: '<%= components_location %>/<%= module_scope %>/<%= module_name %>/',
                expand: true
            },
            boilerplate: {
                cwd: __dirname+ '/lib/boilerplate/', // set working folder / root to copy
                src: '**/*', // copy all files and subfolders
                dest:  "<%= components_location %>/",  // destination folder
                expand: true           // required when using cwd
            },
            boilerplate_sample: {
                cwd: __dirname+ '/lib/sample_boilerplate/', // set working folder / root to copy
                src: '**/*', // copy all files and subfolders
                dest:  "<%= components_location %>/",  // destination folder
                expand: true           // required when using cwd
            },
            boilerplate_classic: {
                cwd: __dirname+ '/lib/boilerplate_without_classjs/', // set working folder / root to copy
                src: '**/*', // copy all files and subfolders
                dest: "<%= components_location %>/", // destination folder
                expand: true           // required when using cwd
            }
        },
        clean: {
            yourTarget: {
                src: ['temp']
            }
        }

    });

    grunt.registerTask('controller',
            [
                'replace:controller',
                'rename:controller',
                'copy:controller',
                'clean'
            ]);

    grunt.registerTask('service',
            [
                'replace:service',
                'rename:service',
                'copy:service',
                'clean'
            ]);
    grunt.registerTask('model',
            [
                'replace:model',
                'rename:model',
                'copy:model',
                'clean'
            ]);
    grunt.registerTask('directive',
            [
                'replace:directive',
                'replace:partial',
                'rename:directive',
                'copy:directive',
                'clean'
            ]);
    grunt.registerTask('filter',
            [
                'replace:filter',
                'rename:filter',
                'copy:filter',
                'clean'
            ]);
    grunt.registerTask('complete_module',
            [
                'replace:controller',
                'rename:controller',
                'copy:controller',
                'replace:service',
                'rename:service',
                'copy:service',
                'replace:model',
                'rename:model',
                'copy:model',
                'clean'
            ]);
};