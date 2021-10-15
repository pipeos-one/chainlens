import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Dtype} from '../models';
import {DtypeRepository} from '../repositories';

export class DtypeController {
  constructor(
    @repository(DtypeRepository)
    public dtypeRepository : DtypeRepository,
  ) {}

  @post('/dtype')
  @response(200, {
    description: 'Dtype model instance',
    content: {'application/json': {schema: getModelSchemaRef(Dtype)}},
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

  @get('/dtype/count')
  @response(200, {
    description: 'Dtype model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Dtype) where?: Where<Dtype>,
  ): Promise<Count> {
    return this.dtypeRepository.count(where);
  }

  @get('/dtype')
  @response(200, {
    description: 'Array of Dtype model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Dtype, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Dtype) filter?: Filter<Dtype>,
  ): Promise<Dtype[]> {
    return this.dtypeRepository.find(filter);
  }

  @patch('/dtype')
  @response(200, {
    description: 'Dtype PATCH success count',
    content: {'application/json': {schema: CountSchema}},
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
    @param.where(Dtype) where?: Where<Dtype>,
  ): Promise<Count> {
    return this.dtypeRepository.updateAll(dtype, where);
  }

  @get('/dtype/{id}')
  @response(200, {
    description: 'Dtype model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Dtype, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Dtype, {exclude: 'where'}) filter?: FilterExcludingWhere<Dtype>
  ): Promise<Dtype> {
    return this.dtypeRepository.findById(id, filter);
  }

  @patch('/dtype/{id}')
  @response(204, {
    description: 'Dtype PATCH success',
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

  @put('/dtype/{id}')
  @response(204, {
    description: 'Dtype PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dtype: Dtype,
  ): Promise<void> {
    await this.dtypeRepository.replaceById(id, dtype);
  }

  @del('/dtype/{id}')
  @response(204, {
    description: 'Dtype DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.dtypeRepository.deleteById(id);
  }
}
