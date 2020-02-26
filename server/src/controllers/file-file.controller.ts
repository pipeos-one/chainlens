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
  File,
} from '../models';
import {FileRepository} from '../repositories';

export class FileFileController {
  constructor(
    @repository(FileRepository) protected fileRepository: FileRepository,
  ) { }

  @get('/files/{id}/files', {
    responses: {
      '200': {
        description: 'Array of File has many File',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(File)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<File>,
  ): Promise<File[]> {
    return this.fileRepository.subfiles(id).find(filter);
  }

  @post('/files/{id}/files', {
    responses: {
      '200': {
        description: 'File model instance',
        content: {'application/json': {schema: getModelSchemaRef(File)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof File.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(File, {
            title: 'NewFileInFile',
            exclude: ['_id'],
            optional: ['_id']
          }),
        },
      },
    }) file: Omit<File, '_id'>,
  ): Promise<File> {
    return this.fileRepository.subfiles(id).create(file);
  }

  @patch('/files/{id}/files', {
    responses: {
      '200': {
        description: 'File.File PATCH success count',
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
    return this.fileRepository.subfiles(id).patch(file, where);
  }

  @del('/files/{id}/files', {
    responses: {
      '200': {
        description: 'File.File DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(File)) where?: Where<File>,
  ): Promise<Count> {
    return this.fileRepository.subfiles(id).delete(where);
  }
}
