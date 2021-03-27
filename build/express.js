import { outputHTML } from "./";
import path from "path";
import fs from "fs";
const scopedEval = eval;
/**
 * Use JSONX for express view rendering
 * @param {string} filePath - path to jsonx express view
 * @param {object} options - property used for express view {locals}
 * @param {object} options.__boundConfig - property used to bind this object for JSONX, can be used to add custom components
 * @param {string} [options.__DOCTYPE="<!DOCTYPE html>"] - html doctype string
 * @param {*} callback
 */
export function __express(filePath, options, callback) {
    try {
        let jsonxModule = options?.__jsonx;
        let isJSON = false;
        if (filePath) {
            isJSON = (path.extname(filePath) === ".json");
            const jsFile = fs.readFileSync(filePath).toString();
            jsonxModule = (isJSON)
                ? scopedEval(`(${jsFile})`)
                : scopedEval(jsFile);
        }
        const resources = Object.assign({}, options);
        delete resources.__boundConfig;
        delete resources.__DOCTYPE;
        delete resources.__jsonx;
        const context = Object.assign({ disableRenderIndexKey: false }, options?.__boundConfig);
        // if (isJSON) context.useJSON = true;
        const jsonxRenderedString = outputHTML.call(context, {
            jsonx: jsonxModule,
            resources
        });
        const template = `${options?.__DOCTYPE || "<!DOCTYPE html>"}
${jsonxRenderedString}`;
        if (typeof callback === "function")
            callback(null, template);
        else
            return template;
    }
    catch (e) {
        if (typeof callback === "function")
            callback(e);
        else
            throw e;
    }
}
