import { getReactElementFromRJX, } from './main';
/**
 * returns a valid rjx.children property
 * @param {Object} options
 * @param {Object} [options.rjx ={}]- Valid RJX JSON 
 * @param {Object} [options.props=options.rjx.children] - Props to pull children  Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) 
 * @returns {Object[]|String} returns a valid rjx.children property that's either an array of RJX objects or a string 
 * @example 
 * const sampleRJX = {
  component: 'div',
  props: {
    id: 'generatedRJX',
    className:'rjx',
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
const RJXChildren = getChildrenProperty({ rjx: sampleRJX, }); //=> [ [rjx Object],[rjx Object]]
const RJXChildrenPTag = getChildrenProperty({ rjx: sampleRJX.children[ 0 ], }); //=>hello world
 */
export function getChildrenProperty(options = {}) {
  const { rjx = {}, } = options;
  const props = options.props || rjx.props || {};
  if (props._children /* && !rjx.children */) {
    if (Array.isArray(props._children) || typeof props._children === 'string'){
      return props._children;
    } else {
      return rjx.children;
    }
  } else if (typeof rjx.children === 'undefined'){
    if (props && props.children && (typeof props.children !== 'undefined' || Array.isArray(props.children))) {
      return props.children;
    } else {
      return null;  
    }
  } else {
    return rjx.children;
  }
}

/**
 * Used to pass properties down to child components if passprops is set to true
 * @param {Object} options
 * @param {Object} [options.rjx ={}] - Valid RJX JSON 
 * @param {Object} [options.childrjx ={}] - Valid RJX JSON 
 * @param {Number} options.renderIndex - React key property 
 * @param {Object} [options.props=options.rjx.props] - Props to pull children  Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) 
 * @returns {Object|String} returns a valid  Valid RJX Child object or a string 
 */
export function getChildrenProps(options = {}) {
  const { rjx = {}, childrjx, renderIndex, } = options;
  const props = options.props || rjx.props || {};

  return (rjx.passprops && typeof childrjx==='object')
    ? Object.assign({},
      childrjx, {
        props: Object.assign({},
          props,
          ((childrjx.thisprops && childrjx.thisprops.style) // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
            || (childrjx.asyncprops && childrjx.asyncprops.style)
            || (childrjx.windowprops && childrjx.windowprops.style))
            ? {}
            : {
              style: {},
            },
          childrjx.props,
          { key: renderIndex + Math.random(), }),
      })
    : childrjx;
}

/**
 * returns React Child Elements via RJX
 * @param {*} options 
 * @property {object} this - options for getReactElementFromRJX
 * @property {Object} [this.componentLibraries] - react components to render with RJX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 */
export function getRJXChildren(options = {}) {
  // eslint-disable-next-line
  const { rjx, resources, renderIndex, logError = console.error, } = options;
  try {
    const props = options.props || rjx.props || {};
    rjx.children = getChildrenProperty({ rjx, props, });

    return (rjx.children && Array.isArray(rjx.children) && typeof rjx.children !== 'string')
      ? rjx.children.map(childrjx => getReactElementFromRJX.call(this, getChildrenProps({ rjx, childrjx, props, renderIndex, }), resources))
      : rjx.children;

  } catch (e) {
    logError(e);
    return null;
  }
}