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
