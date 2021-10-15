import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {YugabyteDataSource} from '../datasources';
import {Pfunction, PfunctionRelations, Pclass} from '../models';
import {PclassRepository} from './pclass.repository';

export class PfunctionRepository extends DefaultCrudRepository<
  Pfunction,
  typeof Pfunction.prototype._id,
  PfunctionRelations
> {

  public readonly pclass: BelongsToAccessor<Pclass, typeof Pfunction.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('PclassRepository') protected pclassRepositoryGetter: Getter<PclassRepository>,
  ) {
    super(Pfunction, dataSource);
    this.pclass = this.createBelongsToAccessorFor('pclass', pclassRepositoryGetter,);
    this.registerInclusionResolver('pclass', this.pclass.inclusionResolver);
  }
}
