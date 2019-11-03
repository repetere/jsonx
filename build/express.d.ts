/**
 * Use JSONX for express view rendering
 * @param {string} filePath - path to jsonx express view
 * @param {object} options - property used for express view {locals}
 * @param {object} options.__boundConfig - property used to bind this object for JSONX, can be used to add custom components
 * @param {string} [options.__DOCTYPE="<!DOCTYPE html>"] - html doctype string
 * @param {*} callback
 */
export declare function __express(filePath: string, options: any, callback: any): string | undefined;
