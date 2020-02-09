import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Pclass, PclassRelations, Pfunction, PclassInstance} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PfunctionRepository} from './pfunction.repository';
import {PclassInstanceRepository} from './pclass-instance.repository';

export class PclassRepository extends DefaultCrudRepository<
  Pclass,
  typeof Pclass.prototype._id,
  PclassRelations
> {

  public readonly pfunctions: HasManyRepositoryFactory<Pfunction, typeof Pclass.prototype._id>;

  public readonly pclassInstances: HasManyRepositoryFactory<PclassInstance, typeof Pclass.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('PfunctionRepository') protected pfunctionRepositoryGetter: Getter<PfunctionRepository>, @repository.getter('PclassInstanceRepository') protected pclassInstanceRepositoryGetter: Getter<PclassInstanceRepository>,
  ) {
    super(Pclass, dataSource);
    this.pclassInstances = this.createHasManyRepositoryFactoryFor('pclassInstances', pclassInstanceRepositoryGetter,);
    this.registerInclusionResolver('pclassInstances', this.pclassInstances.inclusionResolver);
    this.pfunctions = this.createHasManyRepositoryFactoryFor('pfunctions', pfunctionRepositoryGetter,);
    this.registerInclusionResolver('pfunctions', this.pfunctions.inclusionResolver);
  }
}
