import {DefaultCrudRepository} from '@loopback/repository';
import {Package, PackageRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PackageRepository extends DefaultCrudRepository<
  Package,
  typeof Package.prototype._id,
  PackageRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(Package, dataSource);
  }
}
