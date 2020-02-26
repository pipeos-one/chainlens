import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {LanguageSource, LanguageSourceRelations, File} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {FileRepository} from './file.repository';

export class LanguageSourceRepository extends DefaultCrudRepository<
  LanguageSource,
  typeof LanguageSource.prototype._id,
  LanguageSourceRelations
> {

  public readonly file: HasOneRepositoryFactory<File, typeof LanguageSource.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>,
  ) {
    super(LanguageSource, dataSource);
    this.file = this.createHasOneRepositoryFactoryFor('file', fileRepositoryGetter);
    this.registerInclusionResolver('file', this.file.inclusionResolver);
  }
}
