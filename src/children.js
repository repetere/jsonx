import { getReactElementFromJSONX, } from './main';
/**
 * returns a valid jsonx.children property
 * @param {Object} options
 * @param {Object} [options.jsonx ={}]- Valid JSONX JSON 
 * @param {Object} [options.props=options.jsonx.children] - Props to pull children  Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops) 
 * @returns {Object[]|String} returns a valid jsonx.children property that's either an array of JSONX objects or a string 
 * @example 
 * const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className:'jsonx',
  },
  children: [
    {
      component: 'p',
      props: {
        style: {
          color: 'red',
        },
      },
      children:'hello world',
    },
    {
      component: 'div',
      children: [
        {
          component: 'ul',
          children: [
            {
              component: 'li',
              children:'list',
            },
          ],
        },
      ],
    },
  ],
};
const JSONXChildren = getChildrenProperty({ jsonx: sampleJSONX, }); //=> [ [jsonx Object],[jsonx Object]]
const JSONXChildrenPTag = getChildrenProperty({ jsonx: sampleJSONX.children[ 0 ], }); //=>hello world
 */
export function getChildrenProperty(options = {}) {
  const { jsonx = {}, } = options;
  const props = options.props || jsonx.props || {};
  if (props._children /* && !jsonx.children */) {
    if (Array.isArray(props._children) || typeof props._children === 'string'){
      return props._children;
    } else {
      return jsonx.children;
    }
  } else if (typeof jsonx.children === 'undefined'){
    if (props && props.children && (typeof props.children !== 'undefined' || Array.isArray(props.children))) {
      return props.children;
    } else {
      return null;  
    }
  } else {
    return jsonx.children;
  }
}

/**
 * Used to pass properties down to child components if passprops is set to true
 * @param {Object} options
 * @param {Object} [options.jsonx ={}] - Valid JSONX JSON 
 * @param {Object} [options.childjsonx ={}] - Valid JSONX JSON 
 * @param {Number} options.renderIndex - React key property 
 * @param {Object} [options.props=options.jsonx.props] - Props to pull children  Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops) 
 * @returns {Object|String} returns a valid  Valid JSONX Child object or a string 
 */
export function getChildrenProps(options = {}) {
  const { jsonx = {}, childjsonx, renderIndex, } = options;
  const props = options.props || jsonx.props || {};

  return (jsonx.passprops && typeof childjsonx==='object')
    ? Object.assign({},
      childjsonx, {
        props: Object.assign({},
          props,
          ((childjsonx.thisprops && childjsonx.thisprops.style) // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
            || (childjsonx.asyncprops && childjsonx.asyncprops.style)
            || (childjsonx.windowprops && childjsonx.windowprops.style))
            ? {}
            : {
              style: {},
            },
          childjsonx.props,
          { key: renderIndex + Math.random(), }),
      })
    : childjsonx;
}

/**
 * returns React Child Elements via JSONX
 * @param {*} options 
 * @property {object} this - options for getReactElementFromJSONX
 * @property {Object} [this.componentLibraries] - react components to render with JSONX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 */
export function getJSONXChildren(options = {}) {
  // eslint-disable-next-line
  const { jsonx, resources, renderIndex, logError = console.error, } = options;
  try {
    const props = options.props || jsonx.props || {};
    jsonx.children = getChildrenProperty({ jsonx, props, });

    return (jsonx.children && Array.isArray(jsonx.children) && typeof jsonx.children !== 'string')
      ? jsonx.children.map(childjsonx => getReactElementFromJSONX.call(this, getChildrenProps({ jsonx, childjsonx, props, renderIndex, }), resources))
      : jsonx.children;

  } catch (e) {
    logError(e);
    return null;
  }
}