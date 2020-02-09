import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Pclass, PclassRelations, Pfunction} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PfunctionRepository} from './pfunction.repository';

export class PclassRepository extends DefaultCrudRepository<
  Pclass,
  typeof Pclass.prototype._id,
  PclassRelations
> {

  public readonly pfunctions: HasManyRepositoryFactory<Pfunction, typeof Pclass.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('PfunctionRepository') protected pfunctionRepositoryGetter: Getter<PfunctionRepository>,
  ) {
    super(Pclass, dataSource);
    this.pfunctions = this.createHasManyRepositoryFactoryFor('pfunctions', pfunctionRepositoryGetter,);
    this.registerInclusionResolver('pfunctions', this.pfunctions.inclusionResolver);
  }
}
