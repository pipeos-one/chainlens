import {DefaultCrudRepository} from '@loopback/repository';
import {Pfunction, PfunctionRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PfunctionRepository extends DefaultCrudRepository<
  Pfunction,
  typeof Pfunction.prototype._id,
  PfunctionRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(Pfunction, dataSource);
  }
}
