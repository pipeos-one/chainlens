import {DefaultCrudRepository} from '@loopback/repository';
import {PPackage, PPackageRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PPackageRepository extends DefaultCrudRepository<
  PPackage,
  typeof PPackage.prototype._id,
  PPackageRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(PPackage, dataSource);
  }
}
