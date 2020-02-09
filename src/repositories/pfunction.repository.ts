import {DefaultCrudRepository} from '@loopback/repository';
import {PFunction, PFunctionRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PFunctionRepository extends DefaultCrudRepository<
  PFunction,
  typeof PFunction.prototype._id,
  PFunctionRelations
> {
  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource,
  ) {
    super(PFunction, dataSource);
  }
}
