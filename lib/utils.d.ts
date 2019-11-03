/**
 * Used to evaluate whether or not to render a component
 * @param {Object} options
 * @param {Object} options.jsonx - Valid JSONX JSON
 * @param {Object} options.props - Props to test comparison values against, usually Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops)
 * @returns {Boolean} returns true if all comparisons are true or if using or comparisons, at least one condition is true
 * @example
 const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className: 'jsonx',
    bigNum: 1430931039,
    smallNum: 0.425,
    falsey: false,
    truthy: true,
  },
  children: 'some div',
};
const testJSONX = Object.assign({}, sampleJSONX, {
  comparisonprops: [{
    left: ['truthy',],
    operation:'==',
    right:['falsey',],
  }],
});
displayComponent({ jsonx: testJSONX, props: testJSONX2.props, }) // => false
 */
export declare function displayComponent(options?: {}): boolean;
/**
 * Use to test if can bind components this context for react-redux-router
 * @returns {Boolean} true if browser is not IE or old android / chrome
 */
export declare function getAdvancedBinding(): boolean;
/**
 * take an object of array paths to traverse and resolve
 * @example
 * const testObj = {
      user: {
        name: 'jsonx',
        description: 'react withouth javascript',
      },
      stats: {
        logins: 102,
        comments: 3,
      },
      authentication: 'OAuth2',
    };
const testVals = { auth: ['authentication', ], username: ['user', 'name', ], };

 traverse(testVals, testObj) // =>{ auth:'OAuth2', username:'jsonx',  }
 * @param {Object} paths - an object to resolve array property paths
 * @param {Object} data - object to traverse
 * @returns {Object} resolved object with traversed properties
 * @throws {TypeError}
 */
export declare function traverse(paths?: {}, data?: {}): {};
/**
 * Validates JSONX JSON Syntax
 * @example
 * validateJSONX({component:'p',children:'hello world'})=>true
 * validateJSONX({children:'hello world'})=>throw SyntaxError('[0001] Missing React Component')
 * @param {Object} jsonx - JSONX JSON to validate
 * @param {Boolean} [returnAllErrors=false] - flag to either throw error or to return all errors in an array of errors
 * @returns {Boolean|Error[]} either returns true if JSONX is valid, or throws validation error or returns list of errors in array
 * @throws {SyntaxError|TypeError|ReferenceError}
 */
export declare function validateJSONX(jsonx?: {}, returnAllErrors?: boolean): string | true | any[];
/**
 * validates simple JSONX Syntax {[component]:{props,children}}
 * @param {Object} simpleJSONX - Any valid simple JSONX Syntax
 * @return {Boolean} returns true if simpleJSONX is valid
 */
export declare function validSimpleJSONXSyntax(simpleJSONX?: {}): boolean;
/**
 * Transforms SimpleJSONX to Valid JSONX JSON {[component]:{props,children}} => {component,props,children}
 * @param {Object} simpleJSONX JSON Object
 * @return {Object} - returns a valid JSONX JSON Object from a simple JSONX JSON Object
 */
export declare function simpleJSONXSyntax(simpleJSONX?: {}): any;
/**
 * Transforms Valid JSONX JSON to SimpleJSONX  {component,props,children} => {[component]:{props,children}}
 * @param {Object} jsonx Valid JSONX JSON object
 * @return {Object} - returns a simple JSONX JSON Object from a valid JSONX JSON Object
 */
export declare function getSimplifiedJSONX(jsonx?: {}): {};
/**
 * Fetches JSON from remote path
 * @param {String} path - fetch path url
 * @param {Object} options - fetch options
 * @return {Object} - returns fetched JSON data
 */
export declare function fetchJSON(path?: string, options?: {}): Promise<any>;
