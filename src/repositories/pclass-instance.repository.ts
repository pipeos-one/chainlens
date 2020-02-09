import {DefaultCrudRepository} from '@loopback/repository';
import {PClassInstance, PClassInstanceRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PClassInstanceRepository extends DefaultCrudRepository<
  PClassInstance,
  typeof PClassInstance.prototype._id,
  PClassInstanceRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(PClassInstance, dataSource);
  }
}
