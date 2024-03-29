import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {YugabyteDataSource} from '../datasources';
import {Dtype, DtypeRelations} from '../models';

export class DtypeRepository extends DefaultCrudRepository<
  Dtype,
  typeof Dtype.prototype._id,
  DtypeRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(Dtype, dataSource);
  }
}
