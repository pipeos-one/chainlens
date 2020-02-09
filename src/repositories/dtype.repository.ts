import {DefaultCrudRepository} from '@loopback/repository';
import {DType, DTypeRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DTypeRepository extends DefaultCrudRepository<
  DType,
  typeof DType.prototype._id,
  DTypeRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(DType, dataSource);
  }
}
