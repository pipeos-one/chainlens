import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {YugabyteDataSource} from '../datasources';
import {Pgraph, PgraphRelations} from '../models';

export class PgraphRepository extends DefaultCrudRepository<
  Pgraph,
  typeof Pgraph.prototype._id,
  PgraphRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(Pgraph, dataSource);
  }
}
