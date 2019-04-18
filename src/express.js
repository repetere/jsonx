import { rjxHTMLString, } from './main';
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
  
    const rjxRenderedString = rjxHTMLString.call(options.__boundConfig || {}, {
      rjx: rjxModule,
      resources,
    });
    callback(null, `${options.__DOCTYPE || '<!DOCTYPE html>'}
${rjxRenderedString}`);
  } catch (e) {
    callback(e);
  }
}
