#!/usr/bin/env node

var clc = require(__dirname + '/node_modules/cli-color');
var fs = require('fs');

var gruntconfig = {};

if (process.argv[1] === "init") {
    fs.createReadStream(__dirname + '/../xit.json').pipe(fs.createWriteStream(process.cwd() + '/xit.json'));

}

try {
    var xitconfig = require(process.cwd() + '/xit.json');
    if (xitconfig) {
        gruntconfig['location'] = process.cwd() + xitconfig.components || process.cwd();
        console.log(clc.black.bgGreen.blink("xit.json loaded succesfully!"));
    }
} catch (e) {
    if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
        gruntconfig['location'] = process.cwd();
        console.log(clc.white.blink.bgRed("xit.json is not defined!"));
    } else {
        throw e;
    }
}

var grunt = require(__dirname + '/../grunt');

var program = require(__dirname + '/../commander');

program
        .version('0.0.2')
        .option('-sh, --shared', 'Set is shared component')
        .option('-o, --main', 'Set is main component')
        .option('-c, --controller [name]', 'Add controller name')
        .option('-d, --directive [name]', 'Add directive name (Enought to generate directive)')
        .option('-t, --directive-tag [tag]', 'Add directive tag')
        .option('-s, --service [name]', 'Add service name')
        .option('-q, --module [name]', 'Generate module name')
        .option('-m, --model [name]', 'Generate model')
        .option('-f, --filter-string [name]', 'Add HTML Angular filter string')
        .option('-f, --filter [name]', 'Add filter name (Enought to generate filter)')
        .parse(process.argv);





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




var result = false;

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

if (result) {
    console.log(clc.blue("XIT GENERATED SUCCESFULLY!"));
} else {
    console.log(clc.red("No param specified!"));
    console.log(clc.white("Enter --help to see manual."));
}