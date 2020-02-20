export const buildWhereQueries = (genQuery) => {
  let pclassWhere = {};
  let pfunctionWhere = {};
  let pclassiWhere = {};

  if (!genQuery.text) return { pclassWhere, pfunctionWhere, pclassiWhere };

  switch(genQuery.field) {
    case 'name':
      pclassWhere['data.name'] = {like: genQuery.text, options: 'i'};
      pfunctionWhere['data.name'] = {like: genQuery.text, options: 'i'};
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
  return { pclassWhere, pfunctionWhere, pclassiWhere };
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

export function pfunctionColorClass(gapi) {
    let colorClass = '';
    if (gapi.type === 'event') {
        colorClass = 'event';
    } else if (gapi.payable) {
        colorClass = 'payable';
    } else if (!gapi.constant) {
        colorClass = 'nonconstant';
    }
    return colorClass;
};

export const colorMap = {
    event: '#C9DEBB',
    payable: '#CDE0F2',
    nonconstant: '#E9DEDE',
};

export function pfunctionColor(gapi) {
    const colorClass = pfunctionColorClass(gapi);
    return colorMap[colorClass];
};
