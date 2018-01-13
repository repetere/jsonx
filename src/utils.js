export function traverse (paths, data) {
  let keys = Object.keys(paths);
  if (!keys.length) return paths;
  return keys.reduce((result, key) => {
    if (typeof paths[key] === 'string') result[key] = data[paths[key]];
    else if (Array.isArray(paths[key])) {
      let _path = Object.assign([], paths[key]);
      let value = data;
      while (_path.length && value && typeof value === 'object') {
        let prop = _path.shift();
        value = value[prop];
      }
      result[key] = (_path.length) ? undefined : value;
    } else throw new TypeError('asyncprop paths must be a string or an array of strings or numeric indexes');
    return result;
  }, {});
}


/**
 * custom object sort by field
 * @example
 * 			req.controllerData.searchdocuments = searchdocuments.sort(CoreUtilities.sortObject('desc', 'createdat'));
 * @param  {string} dir   either asc or desc
 * @param  {string} field object property to seach
 * @return {function}  object sort compare function
 */
export function sortObject(dir, field) {
  let comparefunction;
  if (dir === 'desc') {
    comparefunction = function (a, b) {
      if (a[field] < b[field]) {
        return 1;
      }
      if (a[field] > b[field]) {
        return -1;
      }
      return 0;
    };
  } else {
    comparefunction = function (a, b) {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    };
  }

  return comparefunction;
}
