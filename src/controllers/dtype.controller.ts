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
} from '@loopback/rest';
import {DType} from '../models';
import {DTypeRepository} from '../repositories';

export class DTypeController {
  constructor(
    @repository(DTypeRepository)
    public dtypeRepository : DTypeRepository,
  ) {}

  @post('/dtype', {
    responses: {
      '200': {
        description: 'DType model instance',
        content: {'application/json': {schema: getModelSchemaRef(DType)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DType, {
            title: 'NewDType',
            exclude: ['_id'],
          }),
        },
      },
    })
    dtype: Omit<DType, '_id'>,
  ): Promise<DType> {
    return this.dtypeRepository.create(dtype);
  }

  @get('/dtype/count', {
    responses: {
      '200': {
        description: 'DType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(DType)) where?: Where<DType>,
  ): Promise<Count> {
    return this.dtypeRepository.count(where);
  }

  @get('/dtype', {
    responses: {
      '200': {
        description: 'Array of DType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DType)) filter?: Filter<DType>,
  ): Promise<DType[]> {
    return this.dtypeRepository.find(filter);
  }

  @patch('/dtype', {
    responses: {
      '200': {
        description: 'DType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DType, {partial: true}),
        },
      },
    })
    dtype: DType,
    @param.query.object('where', getWhereSchemaFor(DType)) where?: Where<DType>,
  ): Promise<Count> {
    return this.dtypeRepository.updateAll(dtype, where);
  }

  @get('/dtype/{id}', {
    responses: {
      '200': {
        description: 'DType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DType, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(DType)) filter?: Filter<DType>
  ): Promise<DType> {
    return this.dtypeRepository.findById(id, filter);
  }

  @patch('/dtype/{id}', {
    responses: {
      '204': {
        description: 'DType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DType, {partial: true}),
        },
      },
    })
    dtype: DType,
  ): Promise<void> {
    await this.dtypeRepository.updateById(id, dtype);
  }

  @put('/dtype/{id}', {
    responses: {
      '204': {
        description: 'DType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dtype: DType,
  ): Promise<void> {
    await this.dtypeRepository.replaceById(id, dtype);
  }

  @del('/dtype/{id}', {
    responses: {
      '204': {
        description: 'DType DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.dtypeRepository.deleteById(id);
  }
}
