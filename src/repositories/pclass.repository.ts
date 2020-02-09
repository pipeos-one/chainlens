import {DefaultCrudRepository} from '@loopback/repository';
import {Pclass, PclassRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PclassRepository extends DefaultCrudRepository<
  Pclass,
  typeof Pclass.prototype._id,
  PclassRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(Pclass, dataSource);
  }
}
