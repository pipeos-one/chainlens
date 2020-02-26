import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  RestBindings,
  Response,
} from '@loopback/rest';
import {inject} from '@loopback/context';
import {File} from '../models';
import {FileRepository} from '../repositories';
import {buildFileFromUpload} from '../utils/file';

// const newFileUploadModelSchema: any = getUploadModelSchema(
//   getModelSchemaRef(File, {
//     title: 'NewFile',
//     exclude: ['_id'],
//   }),
//   'NewFile',
// )

export class FileController {
  constructor(
    @repository(FileRepository)
    public fileRepository : FileRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) {}

  @post('/file', {
    responses: {
      '200': {
        description: 'File model instance',
        content: {'application/json': {schema: getModelSchemaRef(File)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'multipart/form-data': {
          // schema: {
          //   type: 'object',
          //   properties: newFileUploadModelSchema.properties,
          //   // required: newFileUploadModelSchema.required,
          //   // additionalProperties: newFileUploadModelSchema.additionalProperties,
          // },
          schema: {
            type: 'object',
            properties: {
              source: {
                type: 'string',
                format: 'binary',
              },
              pointer: { type: 'object' },
              parentid: { type: 'string' },
              relative_path: { type: 'string'}
            },
          }
        },
      },
    })
    body: any,
  ): Promise<File> {
    console.log('-- body.files: ', body.files);
    console.log('-- body.fields: ', body.fields);
    const upload: any = body.files[0];
    const file: any = buildFileFromUpload(upload, body.fields);

    // const sep: string[] = upload.originalname.split('.');
    //
    // // TODO: get extension from mimetype->extension map
    // if (sep.length < 2) {
    //   throw new Error('Uploaded file name does not contain an extension')
    // }
    // const extension = sep[sep.length - 1];
    //
    // const file: any = Object.assign({}, body.fields, {
    //   name: upload.originalname,
    //   extension,
    //   encoding: upload.encoding,
    //   mimetype: upload.mimetype,
    //   size: upload.size,
    //   source: upload.buffer.toString('hex'),
    // });

    return this.fileRepository.create(file);
  }

  @get('/file/count', {
    responses: {
      '200': {
        description: 'File model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(File)) where?: Where<File>,
  ): Promise<Count> {
    return this.fileRepository.count(where);
  }

  @get('/file', {
    responses: {
      '200': {
        description: 'Array of File model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(File, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(File)) filter?: Filter<File>,
  ): Promise<File[]> {
    return this.fileRepository.find(filter);
  }

  @patch('/file', {
    responses: {
      '200': {
        description: 'File PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(File, {partial: true}),
        },
      },
    })
    file: File,
    @param.query.object('where', getWhereSchemaFor(File)) where?: Where<File>,
  ): Promise<Count> {
    return this.fileRepository.updateAll(file, where);
  }

  @get('/file/{id}', {
    responses: {
      '200': {
        description: 'File model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(File, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(File)) filter?: Filter<File>
  ): Promise<File> {
    return this.fileRepository.findById(id, filter);
  }

  @get('/file/{id}/source', {
    responses: {
      '200': {
        description: 'File model instance',
      },
    },
  })
  async downloadById(
    @param.path.string('id') id: string,
  ) {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      this.response
        .status(404)
        .end('Not found')
    } else {
      this.response
        .status(200)
        .contentType(file.mimetype)
        .attachment(file.name)
        .send(file.source)
    }
  }

  @patch('/file/{id}', {
    responses: {
      '204': {
        description: 'File PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(File, {partial: true}),
        },
      },
    })
    file: File,
  ): Promise<void> {
    await this.fileRepository.updateById(id, file);
  }

  @put('/file/{id}', {
    responses: {
      '204': {
        description: 'File PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() file: File,
  ): Promise<void> {
    await this.fileRepository.replaceById(id, file);
  }

  @del('/file/{id}', {
    responses: {
      '204': {
        description: 'File DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fileRepository.deleteById(id);
  }
}
