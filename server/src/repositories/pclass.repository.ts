import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Pclass, PclassRelations, Pfunction, PclassInstance, Ppackage, LanguageSource} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PfunctionRepository} from './pfunction.repository';
import {PclassInstanceRepository} from './pclass-instance.repository';
import {PpackageRepository} from './ppackage.repository';
import {LanguageSourceRepository} from './language-source.repository';

export class PclassRepository extends DefaultCrudRepository<
  Pclass,
  typeof Pclass.prototype._id,
  PclassRelations
> {

  public readonly pfunctions: HasManyRepositoryFactory<Pfunction, typeof Pclass.prototype._id>;

  public readonly pclassInstances: HasManyRepositoryFactory<PclassInstance, typeof Pclass.prototype._id>;

  public readonly ppackage: BelongsToAccessor<Ppackage, typeof Pclass.prototype._id>;

  public readonly sources: HasManyRepositoryFactory<LanguageSource, typeof Pclass.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('PfunctionRepository') protected pfunctionRepositoryGetter: Getter<PfunctionRepository>, @repository.getter('PclassInstanceRepository') protected pclassInstanceRepositoryGetter: Getter<PclassInstanceRepository>, @repository.getter('PpackageRepository') protected ppackageRepositoryGetter: Getter<PpackageRepository>, @repository.getter('LanguageSourceRepository') protected languageSourceRepositoryGetter: Getter<LanguageSourceRepository>,
  ) {
    super(Pclass, dataSource);
    this.sources = this.createHasManyRepositoryFactoryFor('sources', languageSourceRepositoryGetter,);
    this.registerInclusionResolver('sources', this.sources.inclusionResolver);
    this.ppackage = this.createBelongsToAccessorFor('ppackage', ppackageRepositoryGetter,);
    this.registerInclusionResolver('ppackage', this.ppackage.inclusionResolver);
    this.pclassInstances = this.createHasManyRepositoryFactoryFor('pclassInstances', pclassInstanceRepositoryGetter,);
    this.registerInclusionResolver('pclassInstances', this.pclassInstances.inclusionResolver);
    this.pfunctions = this.createHasManyRepositoryFactoryFor('pfunctions', pfunctionRepositoryGetter,);
    this.registerInclusionResolver('pfunctions', this.pfunctions.inclusionResolver);
  }
}
