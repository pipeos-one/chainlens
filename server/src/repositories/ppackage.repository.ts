import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {YugabyteDataSource} from '../datasources';
import {Ppackage, PpackageRelations, Pclass} from '../models';
import {PclassRepository} from './pclass.repository';

export class PpackageRepository extends DefaultCrudRepository<
  Ppackage,
  typeof Ppackage.prototype._id,
  PpackageRelations
> {

  public readonly pclasses: HasManyRepositoryFactory<Pclass, typeof Ppackage.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('PclassRepository') protected pclassRepositoryGetter: Getter<PclassRepository>,
  ) {
    super(Ppackage, dataSource);
    this.pclasses = this.createHasManyRepositoryFactoryFor('pclasses', pclassRepositoryGetter,);
    this.registerInclusionResolver('pclasses', this.pclasses.inclusionResolver);
  }
}
