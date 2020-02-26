import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  File,
  LanguageSource,
} from '../models';
import {FileRepository} from '../repositories';

export class FileLanguageSourceController {
  constructor(
    @repository(FileRepository)
    public fileRepository: FileRepository,
  ) { }

  @get('/files/{id}/language-source', {
    responses: {
      '200': {
        description: 'LanguageSource belonging to File',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LanguageSource)},
          },
        },
      },
    },
  })
  async getLanguageSource(
    @param.path.string('id') id: typeof File.prototype._id,
  ): Promise<LanguageSource> {
    return this.fileRepository.languageSource(id);
  }
}
