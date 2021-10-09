import {DefaultCrudRepository} from '@loopback/repository';
import {TypeInstance, TypeInstanceRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

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
