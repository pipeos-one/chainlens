import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {File, FileRelations, LanguageSource} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {LanguageSourceRepository} from './language-source.repository';

export class FileRepository extends DefaultCrudRepository<
  File,
  typeof File.prototype._id,
  FileRelations
> {

  public readonly subfiles: HasManyRepositoryFactory<File, typeof File.prototype._id>;

  public readonly languageSource: BelongsToAccessor<LanguageSource, typeof File.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>, @repository.getter('LanguageSourceRepository') protected languageSourceRepositoryGetter: Getter<LanguageSourceRepository>,
  ) {
    super(File, dataSource);
    this.languageSource = this.createBelongsToAccessorFor('languageSource', languageSourceRepositoryGetter,);
    this.registerInclusionResolver('languageSource', this.languageSource.inclusionResolver);
    this.subfiles = this.createHasManyRepositoryFactoryFor('subfiles', fileRepositoryGetter,);
    this.registerInclusionResolver('subfiles', this.subfiles.inclusionResolver);
  }
}
