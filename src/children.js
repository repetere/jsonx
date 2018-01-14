import { getRenderedJSON, } from './main';

export function getChildrenArray(options = {}) {
  return options;
}

export function getChildrenStringOrProp(options = {}) {
  const { rjx, props, } = options;

  return (typeof rjx.children === 'undefined')
    ? (props && props.children && (typeof props.children === 'string' || Array.isArray(props.children) ))
      ? props.children : null
    : rjx.children;
}

export function getChildrenProps(options = {}) {
  const { rjx, childrjx, props, renderIndex, } = options;
  return (rjx.bindprops)
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

export function getRJXChildren(options = {}) {
  // eslint-disable-next-line
  const { rjx, props, resources, renderIndex, logError = console.error, } = options;
  try {
    if (props._children /* && !rjx.children */) {
      if (Array.isArray(props._children)) {
        rjx.children = [].concat(props._children);
      } else {
        rjx.children = props._children;
      }
      delete props._children;
    }

    return (rjx.children && Array.isArray(rjx.children) && typeof rjx.children !== 'string')
      ? rjx.children.map(childrjx => getRenderedJSON.call(this, getChildrenProps({ rjx, childrjx, props, renderIndex, }), resources))
      : getChildrenStringOrProp({ rjx, props, });

  } catch (e) {
    logError(e, (e.stack) ? e.stack : 'no stack');
    return null;
  }
}