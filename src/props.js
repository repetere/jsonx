if (typeof window === 'undefined') {
  var window = {};
}
export let componentMap = Object.assign({}, React.DOM, window.__rjx_custom_elements);

export function getRenderedCompProps(options = {}) {
  // eslint-disable-next-line
  const { componentObject, resources, renderIndex, logError = console.error, } = options;
  try {
    let x = 3;
    return {};
  } catch (e) {
    logError(e, (e.stack) ? e.stack : 'no stack');
    return null;
  }
}