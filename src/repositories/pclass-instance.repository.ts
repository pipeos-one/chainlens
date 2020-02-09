import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PclassInstance, PclassInstanceRelations, Pclass} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PclassRepository} from './pclass.repository';

export class PclassInstanceRepository extends DefaultCrudRepository<
  PclassInstance,
  typeof PclassInstance.prototype._id,
  PclassInstanceRelations
> {

  public readonly pclass: BelongsToAccessor<Pclass, typeof PclassInstance.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('PclassRepository') protected pclassRepositoryGetter: Getter<PclassRepository>,
  ) {
    super(PclassInstance, dataSource);
    this.pclass = this.createBelongsToAccessorFor('pclass', pclassRepositoryGetter,);
    this.registerInclusionResolver('pclass', this.pclass.inclusionResolver);
  }
}
