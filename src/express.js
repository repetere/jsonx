import { outputHTML, } from './main';
import path from 'path';
/**
 * Use RJX for express view rendering
 * @param {string} filePath - path to rjx express view 
 * @param {object} options - property used for express view {locals}
 * @param {object} options.__boundConfig - property used to bind this object for RJX, can be used to add custom components
 * @param {string} [options.__DOCTYPE="<!DOCTYPE html>"] - html doctype string
 * @param {*} callback 
 */
export function __express(filePath, options, callback) {
  try {
    const rjxModule = options.__rjx || require(filePath);
    const resources = Object.assign({}, options);
    delete resources.__boundConfig;
    delete resources.__DOCTYPE;
    delete resources.__rjx;
    const context = Object.assign({}, options.__boundConfig);
    if (path.extname('.json')) context.useJSON = true;
  
    const rjxRenderedString = outputHTML.call(context, {
      rjx: rjxModule,
      resources,
    });
    const template = `${options.__DOCTYPE || '<!DOCTYPE html>'}
${rjxRenderedString}`;
    if (typeof callback === 'function') callback(null, template);
    else return template;
  } catch (e) {
    if (typeof callback === 'function') callback(e);
    else throw e;
  }
}
