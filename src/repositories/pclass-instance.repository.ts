import {DefaultCrudRepository} from '@loopback/repository';
import {PclassInstance, PclassInstanceRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PclassInstanceRepository extends DefaultCrudRepository<
  PclassInstance,
  typeof PclassInstance.prototype._id,
  PclassInstanceRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(PclassInstance, dataSource);
  }
}
