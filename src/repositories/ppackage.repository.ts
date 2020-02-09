import {DefaultCrudRepository} from '@loopback/repository';
import {Ppackage, PpackageRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PpackageRepository extends DefaultCrudRepository<
  Ppackage,
  typeof Ppackage.prototype._id,
  PpackageRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(Ppackage, dataSource);
  }
}
