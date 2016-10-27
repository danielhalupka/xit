#!/usr/bin/env node

var program = require(__dirname + '/../commander');

program
        .version('0.0.2')
        .option('-s, --shared', 'Set is shared component')
        .option('-o, --main', 'Set is main component')
        .option('-c, --controller [name]', 'Generate controller with [name]')
        .option('-d, --directive [name]', 'Generate directive with [name] (Enought to generate directive)')
        .option('-t, --directive-tag [tag]', 'Generate directive with [tag]')
        .option('-s, --service [name]', 'Generate service with [name]')
        .option('-q, --module [name]', 'Generate module with [name]')
        .option('-m, --model [name]', 'Generate model with [name]')
        .option('-f, --filter-string [name]', 'Add HTML Angular filter [string]')
        .option('-f, --filter [name]', 'Add filter with [name](Enought to generate filter)')
        .option('-i, --init', 'Initialize XIT, generate xit.json')
        .option('-p, --classic', 'Generate standard component')
        .option('-b, --boilerplate', 'Generate XIT boilerplate')
        .option('-y, --sample', 'Generate --boilerplate with sample application')
        .parse(process.argv);
var clc = require(__dirname + '/node_modules/cli-color');
var fs = require('fs-extra');
var result = false;
var gruntconfig = {};

if (program.init) {
    result = result || true;
    fs.copySync(__dirname + '/xit.json', process.cwd() + '/xit.json');
} else {
    try {
        var xitconfig = require(process.cwd() + '/xit.json');
        if (xitconfig) {
            gruntconfig['location'] = process.cwd() + xitconfig.components || process.cwd();
            console.log(clc.green.bgBlack("xit.json loaded succesfully!"));
        }
    } catch (e) {
        if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
            gruntconfig['location'] = process.cwd();
            console.log(clc.yellow.bgBlack("xit.json is not defined!"));
        } else {
            throw e;
        }
    }


    var grunt = require(__dirname + '/../grunt');





    var isClassic = program.classic;
    var generateBoilerplate = program.boilerplate;
    var withSample = program.sample;


    if (isClassic) {
        gruntconfig['is_classic'] = 'classic';
    } else {
        gruntconfig['is_classic'] = 'classjs';
    }



    if (program.shared) {
        gruntconfig['module_scope'] = "shared";
    } else if (program.main) {
        gruntconfig['module_scope'] = "main";
    } else {
        gruntconfig['module_scope'] = "";
    }

    if (xitconfig) {
        gruntconfig['components_location'] = xitconfig.components;
    }

    if (program.controller) {
        gruntconfig['controller_name'] = program.controller;
    }

    if (program.directive) {
        gruntconfig['directive_name'] = program.directive;
        gruntconfig['directive_tag'] = program.directiveTag || (program.directive && console.log(clc.yellow('Warning: "Directive tag not specified! --help"')));
    }

    if (program.filter) {
        gruntconfig['filter_param'] = program.filterString || (program.filter.toLowerCase() && console.log(clc.yellow('Warning: "Filter string not specified! --help"')));
        gruntconfig['filter_name'] = program.filter;
    }

    if (program.service) {
        gruntconfig['model_name'] = program.service;
        gruntconfig['model_name_lowercase'] = program.service.toLowerCase();
    }

    if (program.model) {
        gruntconfig['model_name'] = program.model;
        gruntconfig['model_name_lowercase'] = program.model.toLowerCase();
    }

    if (program.module) {
        gruntconfig['module_name'] = program.module;
        gruntconfig['model_name'] = program.module;
        gruntconfig['model_name_lowercase'] = String(program.module).toLowerCase();
        gruntconfig['controller_name'] = program.module;
    }

    process.chdir(__dirname);






    if (program.controller) {
        result = result || true;
        gruntconfig['module_name'] = program.controller;
        grunt.config.set('gruntconfig', gruntconfig);
        grunt.tasks(['replace:controller',
            'rename:controller',
            'copy:controller',
            'clean']);
    }

    if (program.directive) {
        result = result || true;
        gruntconfig['module_name'] = program.directive;
        grunt.config.set('gruntconfig', gruntconfig);
        grunt.tasks(['replace:directive',
            'replace:partial',
            'rename:directive',
            'copy:directive',
            'clean']);
    }

    if (program.filter) {
        result = result || true;
        gruntconfig['module_name'] = program.filter;
        grunt.config.set('gruntconfig', gruntconfig);
        grunt.tasks(['replace:filter',
            'rename:filter',
            'copy:filter',
            'clean']);
    }

    if (program.service) {
        result = result || true;
        gruntconfig['module_name'] = program.service;
        grunt.config.set('gruntconfig', gruntconfig);
        grunt.tasks(['replace:service',
            'rename:service',
            'copy:service',
            'clean']);
    }

    if (program.model) {
        result = result || true;
        gruntconfig['module_name'] = program.model;
        grunt.config.set('gruntconfig', gruntconfig);
        grunt.tasks(['replace:model',
            'rename:model',
            'copy:model',
            'clean']);
    }

    if (program.module) {
        result = result || true;

        grunt.config.set('gruntconfig', gruntconfig);
        grunt.tasks(['replace:controller',
            'rename:controller',
            'copy:controller',
            'replace:service',
            'rename:service',
            'copy:service',
            'replace:model',
            'rename:model',
            'copy:model',
            'clean']);
    }

    if (generateBoilerplate) {
        result = result || true;
        grunt.config.set('gruntconfig', gruntconfig);
        if (withSample) {
            grunt.tasks(['copy:boilerplate_sample']);
            console.log('Run npm install & grunt --first-run --app_name="ApplicationName" before using boilerplate');
        } else if (isClassic) {
            grunt.tasks(['copy:boilerplate_classic']);
            console.log('Run npm install & grunt --first-run --app_name="ApplicationName" before using boilerplate');
        } else {
            grunt.tasks(['copy:boilerplate']);
            console.log('Run npm install & grunt --first-run --app_name="ApplicationName" before using boilerplate');
        }
    }
}
if (result) {
    console.log(clc.green("XIT GENERATED SUCCESFULLY!"));
} else {
    console.log(clc.red("No param specified!"));
    console.log(clc.white("Enter --help to see manual."));
}