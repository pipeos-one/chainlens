import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {File, FileRelations} from '../models';
import {YugabyteDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class FileRepository extends DefaultCrudRepository<
  File,
  typeof File.prototype._id,
  FileRelations
> {

  public readonly subfiles: HasManyRepositoryFactory<File, typeof File.prototype._id>;

  constructor(
    @inject('datasources.yugabyte') dataSource: YugabyteDataSource, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>,
  ) {
    super(File, dataSource);
    this.subfiles = this.createHasManyRepositoryFactoryFor('subfiles', fileRepositoryGetter,);
    this.registerInclusionResolver('subfiles', this.subfiles.inclusionResolver);
  }
}
