import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  LanguageSource,
  File,
} from '../models';
import {LanguageSourceRepository} from '../repositories';

import {getUploadModelSchema} from '../utils/upload_schema';
import {buildFileFromUpload} from '../utils/file';

const newFileUploadModelSchema: any = getUploadModelSchema(getModelSchemaRef(File, {
  title: 'NewFile',
  exclude: ['_id'],
}), 'NewFile')

export class LanguageSourceFileController {
  constructor(
    @repository(LanguageSourceRepository) protected languageSourceRepository: LanguageSourceRepository,
  ) { }

  @get('/language-sources/{id}/file', {
    responses: {
      '200': {
        description: 'LanguageSource has one File',
        content: {
          'application/json': {
            schema: getModelSchemaRef(File),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<File>,
  ): Promise<File> {
    return this.languageSourceRepository.file(id).get(filter);
  }

  @post('/language-sources/{id}/file', {
    responses: {
      '200': {
        description: 'LanguageSource model instance',
        content: {'application/json': {schema: getModelSchemaRef(File)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof LanguageSource.prototype._id,
    @requestBody({
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              source: {
                type: 'string',
                format: 'binary',
              },
              pointer: {
                type: 'object',
              },
              relative_path: {
                type: 'string',
              }
            }
          }
        },
      },
    }) body: any,
  ): Promise<File> {
    const upload: any = body.files[0];
    const file: any = buildFileFromUpload(upload, body.fields);

    return this.languageSourceRepository.file(id).create(file);
  }

  @patch('/language-sources/{id}/file', {
    responses: {
      '200': {
        description: 'LanguageSource.File PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(File, {partial: true}),
        },
      },
    })
    file: Partial<File>,
    @param.query.object('where', getWhereSchemaFor(File)) where?: Where<File>,
  ): Promise<Count> {
    return this.languageSourceRepository.file(id).patch(file, where);
  }

  @del('/language-sources/{id}/file', {
    responses: {
      '200': {
        description: 'LanguageSource.File DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(File)) where?: Where<File>,
  ): Promise<Count> {
    return this.languageSourceRepository.file(id).delete(where);
  }
}
