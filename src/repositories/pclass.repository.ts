import {DefaultCrudRepository} from '@loopback/repository';
import {PClass, PClassRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PClassRepository extends DefaultCrudRepository<
  PClass,
  typeof PClass.prototype._id,
  PClassRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(PClass, dataSource);
  }
}
