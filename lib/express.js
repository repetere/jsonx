"use strict";
exports.__esModule = true;
var main_1 = require("./main");
var path_1 = require("path");
/**
 * Use JSONX for express view rendering
 * @param {string} filePath - path to jsonx express view
 * @param {object} options - property used for express view {locals}
 * @param {object} options.__boundConfig - property used to bind this object for JSONX, can be used to add custom components
 * @param {string} [options.__DOCTYPE="<!DOCTYPE html>"] - html doctype string
 * @param {*} callback
 */
function __express(filePath, options, callback) {
    try {
        var jsonxModule = options.__jsonx; //|| require(filePath);
        var resources = Object.assign({}, options);
        delete resources.__boundConfig;
        delete resources.__DOCTYPE;
        delete resources.__jsonx;
        var context = Object.assign({}, options.__boundConfig);
        if (path_1["default"].extname('.json'))
            context.useJSON = true;
        var jsonxRenderedString = main_1.outputHTML.call(context, {
            jsonx: jsonxModule,
            resources: resources
        });
        var template = (options.__DOCTYPE || '<!DOCTYPE html>') + "\n" + jsonxRenderedString;
        if (typeof callback === 'function')
            callback(null, template);
        else
            return template;
    }
    catch (e) {
        if (typeof callback === 'function')
            callback(e);
        else
            throw e;
    }
}
exports.__express = __express;
