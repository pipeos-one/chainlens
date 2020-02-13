// SELECT * FROM pclass WHERE metadata::jsonb @> '{"chainids":[1]}'::jsonb;
//
//
// SELECT * FROM pfunction WHERE data::jsonb->'gapi' @> '{"inputs":[{"type": "address"}]}'::jsonb;

// "metadata.chainids": {"inq": [1]}
// "data.gapi.inputs": {"inq": [{"type": "address"}]}

export function gapiFilter(tableName: string, filter: any = {}) {
  let containsArrKey: boolean = false;
  let conditions: string[] = [];
  let filterData: string = '';
  filter.where = filter.where || {};

  Object.keys(filter.where).forEach(key => {
    if (
      filter.where[key] instanceof Object
      && filter.where[key].inq
    ) {
      containsArrKey = true;

      const comp = key.split('.');
      const field = comp.shift();
      const arrSubField = comp.pop();
      let condition = `${field}::jsonb`;

      comp.forEach(objfield => {
        condition += `->'${objfield}' `;
      })
      condition += `@> '{"${arrSubField}":${JSON.stringify(filter.where[key].inq)}}'::jsonb`;
      conditions.push(condition);
    }
  });

  if (!containsArrKey) return;

  if (filter.limit) {
    filterData += `LIMIT ${filter.limit}`;
  }
  if (filter.skip) {
    filterData += ` OFFSET ${filter.skip}`;
  }

  return `SELECT * FROM ${tableName} WHERE ${conditions.join(' AND ')} ${filterData};`;

  // .connector.execute(command, parameters, options)

  // await MyModel.dataSource.execute(
  //   'SELECT * FROM Users WHERE email = ?',
  //   ['alice@example.com'],
  //   {/* options */});

}
