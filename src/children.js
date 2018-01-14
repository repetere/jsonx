import { getRenderedJSON, } from './main';

export function getChildrenArray(options = {}) {
  return options;
}

export function getChildrenStringOrProp(options = {}) {
  const { componentObject, props, } = options;

  return (typeof componentObject.children === 'undefined')
    ? (props && props.children && (typeof props.children === 'string' || Array.isArray(props.children) ))
      ? props.children : null
    : componentObject.children;
}

export function getChildrenProps(options = {}) {
  const { componentObject, childComponentObject, props, renderIndex, } = options;
  return (componentObject.bindprops)
    ? Object.assign({},
      childComponentObject, {
        props: Object.assign({},
          props,
          ((childComponentObject.thisprops && childComponentObject.thisprops.style) // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
            || (childComponentObject.asyncprops && childComponentObject.asyncprops.style)
            || (childComponentObject.windowprops && childComponentObject.windowprops.style))
            ? {}
            : {
              style: {},
            },
          childComponentObject.props,
          { key: renderIndex + Math.random(), }),
      })
    : childComponentObject;
}

export function getComponentObjectChildren(options = {}) {
  // eslint-disable-next-line
  const { componentObject, props, resources, renderIndex, logError = console.error, } = options;
  try {
    if (props._children /* && !componentObject.children */) {
      if (Array.isArray(props._children)) {
        componentObject.children = [].concat(props._children);
      } else {
        componentObject.children = props._children;
      }
      delete props._children;
    }

    return (componentObject.children && Array.isArray(componentObject.children) && typeof componentObject.children !== 'string')
      ? componentObject.children.map(childComponentObject => getRenderedJSON.call(this, getChildrenProps({ componentObject, childComponentObject, props, renderIndex, }), resources))
      : getChildrenStringOrProp({ componentObject, props, });

  } catch (e) {
    logError(e, (e.stack) ? e.stack : 'no stack');
    return null;
  }
}