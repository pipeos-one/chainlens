import {PIPEOS_SERVER} from './config';

export const pclassApi = () => `${PIPEOS_SERVER.host}${PIPEOS_SERVER.route.pclass}`;

export const pclassWithPfuncApi = (filter = {}) => {
  filter = {...filter, include: [{relation: 'pfunctions'}]};
  return `${pclassApi()}?filter=${JSON.stringify(filter)}`;
}

export const buildWhereQueries = (genQuery) => {
  let pclassWhere = {};
  let pfunctionWhere = {};
  let pclassiWhere = {};

  switch(genQuery.field) {
    case 'name':
      pclassWhere['data.name'] = genQuery.text;
      pfunctionWhere['data.name'] = genQuery.text;
      break;
    case 'address':
      pclassiWhere['data.deployment.address'] = genQuery.text;
      break;
    case 'signature':
      pfunctionWhere['data.signature'] = genQuery.text;
      break;
    default:
      console.error('Invalid search parameters: ', genQuery);
      break;
  }
}

export const buildWhereFx = (fxQuery) => {
  let pfunctionWhere = {};
  pfunctionWhere[`data.gapi.${fxQuery.field}`] = {
    inq:[{ type: fxQuery.text }]
  }
  return pfunctionWhere;
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
