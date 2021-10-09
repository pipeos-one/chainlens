export const buildWhereQueries = (genQuery) => {
  let pclassWhere = {};
  let pfunctionWhere = {};
  let pclassiWhere = {};
  let dtypeWhere = {};

  if (!genQuery.text) return { pclassWhere, pfunctionWhere, pclassiWhere };
  console.log('genQuery', genQuery)
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
    case 'dtype':
      dtypeWhere['data.identifier'] = genQuery.text;
      break;
    default:
      console.error('Invalid search parameters: ', genQuery);
      break;
  }
  console.log('buildWhereQueries dtypeWhere', JSON.stringify(dtypeWhere));
  return { pclassWhere, pfunctionWhere, pclassiWhere, dtypeWhere };
}

export const buildWhereFx = (fxQuery) => {
  let pfunctionWhere = {};

  if (!fxQuery.text) return pfunctionWhere;

  pfunctionWhere[`data.gapi.${fxQuery.field}`] = {
    inq:[{ type: fxQuery.text }]
  }
  return pfunctionWhere;
}
