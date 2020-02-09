import {DefaultCrudRepository} from '@loopback/repository';
import {Dtype, DtypeRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

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
