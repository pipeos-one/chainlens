import {DefaultCrudRepository} from '@loopback/repository';
import {Graph, GraphRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GraphRepository extends DefaultCrudRepository<
  Graph,
  typeof Graph.prototype._id,
  GraphRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(Graph, dataSource);
  }
}
