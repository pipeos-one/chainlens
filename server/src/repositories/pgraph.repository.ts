import {DefaultCrudRepository} from '@loopback/repository';
import {Pgraph, PgraphRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

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
