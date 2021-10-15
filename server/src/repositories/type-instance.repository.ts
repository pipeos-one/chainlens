import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {YugabyteDataSource} from '../datasources';
import {TypeInstance, TypeInstanceRelations} from '../models';

export class TypeInstanceRepository extends DefaultCrudRepository<
  TypeInstance,
  typeof TypeInstance.prototype._id,
  TypeInstanceRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(TypeInstance, dataSource);
  }
}
