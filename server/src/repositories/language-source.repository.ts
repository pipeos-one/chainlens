import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {LanguageSource, LanguageSourceRelations, File, Pclass} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {FileRepository} from './file.repository';
import {PclassRepository} from './pclass.repository';

export class LanguageSourceRepository extends DefaultCrudRepository<
  LanguageSource,
  typeof LanguageSource.prototype._id,
  LanguageSourceRelations
> {

  public readonly file: HasOneRepositoryFactory<File, typeof LanguageSource.prototype._id>;

  public readonly pclass: BelongsToAccessor<Pclass, typeof LanguageSource.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>, @repository.getter('PclassRepository') protected pclassRepositoryGetter: Getter<PclassRepository>,
  ) {
    super(LanguageSource, dataSource);
    this.pclass = this.createBelongsToAccessorFor('pclass', pclassRepositoryGetter,);
    this.registerInclusionResolver('pclass', this.pclass.inclusionResolver);
    this.file = this.createHasOneRepositoryFactoryFor('file', fileRepositoryGetter);
    this.registerInclusionResolver('file', this.file.inclusionResolver);
  }
}
