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
import {PclassInstance} from '../models';
import {PclassInstanceRepository} from '../repositories';

export class PclassInstanceController {
  constructor(
    @repository(PclassInstanceRepository)
    public pclassInstanceRepository : PclassInstanceRepository,
  ) {}

  @post('/pclassi')
  @response(200, {
    description: 'PclassInstance model instance',
    content: {'application/json': {schema: getModelSchemaRef(PclassInstance)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PclassInstance, {
            title: 'NewPclassInstance',
            exclude: ['_id'],
          }),
        },
      },
    })
    pclassInstance: Omit<PclassInstance, '_id'>,
  ): Promise<PclassInstance> {
    return this.pclassInstanceRepository.create(pclassInstance);
  }

  @get('/pclassi/count')
  @response(200, {
    description: 'PclassInstance model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PclassInstance) where?: Where<PclassInstance>,
  ): Promise<Count> {
    return this.pclassInstanceRepository.count(where);
  }

  @get('/pclassi')
  @response(200, {
    description: 'Array of PclassInstance model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PclassInstance, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PclassInstance) filter?: Filter<PclassInstance>,
  ): Promise<PclassInstance[]> {
    return this.pclassInstanceRepository.find(filter);
  }

  @patch('/pclassi')
  @response(200, {
    description: 'PclassInstance PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PclassInstance, {partial: true}),
        },
      },
    })
    pclassInstance: PclassInstance,
    @param.where(PclassInstance) where?: Where<PclassInstance>,
  ): Promise<Count> {
    return this.pclassInstanceRepository.updateAll(pclassInstance, where);
  }

  @get('/pclassi/{id}')
  @response(200, {
    description: 'PclassInstance model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PclassInstance, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PclassInstance, {exclude: 'where'}) filter?: FilterExcludingWhere<PclassInstance>
  ): Promise<PclassInstance> {
    return this.pclassInstanceRepository.findById(id, filter);
  }

  @patch('/pclassi/{id}')
  @response(204, {
    description: 'PclassInstance PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PclassInstance, {partial: true}),
        },
      },
    })
    pclassInstance: PclassInstance,
  ): Promise<void> {
    await this.pclassInstanceRepository.updateById(id, pclassInstance);
  }

  @put('/pclassi/{id}')
  @response(204, {
    description: 'PclassInstance PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pclassInstance: PclassInstance,
  ): Promise<void> {
    await this.pclassInstanceRepository.replaceById(id, pclassInstance);
  }

  @del('/pclassi/{id}')
  @response(204, {
    description: 'PclassInstance DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pclassInstanceRepository.deleteById(id);
  }
}
