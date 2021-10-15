import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {YugabyteDataSource} from '../datasources';
import {Pclass, PclassRelations, PclassInstance, Pfunction, Ppackage} from '../models';
import {PclassInstanceRepository} from './pclass-instance.repository';
import {PfunctionRepository} from './pfunction.repository';
import {PpackageRepository} from './ppackage.repository';

export class PclassRepository extends DefaultCrudRepository<
  Pclass,
  typeof Pclass.prototype._id,
  PclassRelations
> {

  public readonly pclassInstances: HasManyRepositoryFactory<PclassInstance, typeof Pclass.prototype._id>;

  public readonly pfunctions: HasManyRepositoryFactory<Pfunction, typeof Pclass.prototype._id>;

  public readonly ppackage: BelongsToAccessor<Ppackage, typeof Pclass.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('PclassInstanceRepository') protected pclassInstanceRepositoryGetter: Getter<PclassInstanceRepository>, @repository.getter('PfunctionRepository') protected pfunctionRepositoryGetter: Getter<PfunctionRepository>, @repository.getter('PpackageRepository') protected ppackageRepositoryGetter: Getter<PpackageRepository>,
  ) {
    super(Pclass, dataSource);
    this.ppackage = this.createBelongsToAccessorFor('ppackage', ppackageRepositoryGetter,);
    this.registerInclusionResolver('ppackage', this.ppackage.inclusionResolver);
    this.pfunctions = this.createHasManyRepositoryFactoryFor('pfunctions', pfunctionRepositoryGetter,);
    this.registerInclusionResolver('pfunctions', this.pfunctions.inclusionResolver);
    this.pclassInstances = this.createHasManyRepositoryFactoryFor('pclassInstances', pclassInstanceRepositoryGetter,);
    this.registerInclusionResolver('pclassInstances', this.pclassInstances.inclusionResolver);
  }
}
