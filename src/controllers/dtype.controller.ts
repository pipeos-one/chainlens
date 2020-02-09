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
import {Dtype} from '../models';
import {DtypeRepository} from '../repositories';

export class DTypeController {
  constructor(
    @repository(DtypeRepository)
    public dtypeRepository : DtypeRepository,
  ) {}

  @post('/dtype', {
    responses: {
      '200': {
        description: 'Dtype model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dtype)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dtype, {
            title: 'NewDtype',
            exclude: ['_id'],
          }),
        },
      },
    })
    dtype: Omit<Dtype, '_id'>,
  ): Promise<Dtype> {
    return this.dtypeRepository.create(dtype);
  }

  @get('/dtype/count', {
    responses: {
      '200': {
        description: 'Dtype model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Dtype)) where?: Where<Dtype>,
  ): Promise<Count> {
    return this.dtypeRepository.count(where);
  }

  @get('/dtype', {
    responses: {
      '200': {
        description: 'Array of Dtype model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Dtype, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Dtype)) filter?: Filter<Dtype>,
  ): Promise<Dtype[]> {
    return this.dtypeRepository.find(filter);
  }

  @patch('/dtype', {
    responses: {
      '200': {
        description: 'Dtype PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dtype, {partial: true}),
        },
      },
    })
    dtype: Dtype,
    @param.query.object('where', getWhereSchemaFor(Dtype)) where?: Where<Dtype>,
  ): Promise<Count> {
    return this.dtypeRepository.updateAll(dtype, where);
  }

  @get('/dtype/{id}', {
    responses: {
      '200': {
        description: 'Dtype model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Dtype, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Dtype)) filter?: Filter<Dtype>
  ): Promise<Dtype> {
    return this.dtypeRepository.findById(id, filter);
  }

  @patch('/dtype/{id}', {
    responses: {
      '204': {
        description: 'Dtype PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dtype, {partial: true}),
        },
      },
    })
    dtype: Dtype,
  ): Promise<void> {
    await this.dtypeRepository.updateById(id, dtype);
  }

  @put('/dtype/{id}', {
    responses: {
      '204': {
        description: 'Dtype PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dtype: Dtype,
  ): Promise<void> {
    await this.dtypeRepository.replaceById(id, dtype);
  }

  @del('/dtype/{id}', {
    responses: {
      '204': {
        description: 'Dtype DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.dtypeRepository.deleteById(id);
  }
}
