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
import {PClassInstance} from '../models';
import {PClassInstanceRepository} from '../repositories';

export class PClassInstanceController {
  constructor(
    @repository(PClassInstanceRepository)
    public pclassInstanceRepository : PClassInstanceRepository,
  ) {}

  @post('/pclassi', {
    responses: {
      '200': {
        description: 'PClassInstance model instance',
        content: {'application/json': {schema: getModelSchemaRef(PClassInstance)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PClassInstance, {
            title: 'NewPClassInstance',
            exclude: ['_id'],
          }),
        },
      },
    })
    pclassInstance: Omit<PClassInstance, '_id'>,
  ): Promise<PClassInstance> {
    return this.pclassInstanceRepository.create(pclassInstance);
  }

  @get('/pclassi/count', {
    responses: {
      '200': {
        description: 'PClassInstance model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PClassInstance)) where?: Where<PClassInstance>,
  ): Promise<Count> {
    return this.pclassInstanceRepository.count(where);
  }

  @get('/pclassi', {
    responses: {
      '200': {
        description: 'Array of PClassInstance model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PClassInstance, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PClassInstance)) filter?: Filter<PClassInstance>,
  ): Promise<PClassInstance[]> {
    return this.pclassInstanceRepository.find(filter);
  }

  @patch('/pclassi', {
    responses: {
      '200': {
        description: 'PClassInstance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PClassInstance, {partial: true}),
        },
      },
    })
    pclassInstance: PClassInstance,
    @param.query.object('where', getWhereSchemaFor(PClassInstance)) where?: Where<PClassInstance>,
  ): Promise<Count> {
    return this.pclassInstanceRepository.updateAll(pclassInstance, where);
  }

  @get('/pclassi/{id}', {
    responses: {
      '200': {
        description: 'PClassInstance model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PClassInstance, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(PClassInstance)) filter?: Filter<PClassInstance>
  ): Promise<PClassInstance> {
    return this.pclassInstanceRepository.findById(id, filter);
  }

  @patch('/pclassi/{id}', {
    responses: {
      '204': {
        description: 'PClassInstance PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PClassInstance, {partial: true}),
        },
      },
    })
    pclassInstance: PClassInstance,
  ): Promise<void> {
    await this.pclassInstanceRepository.updateById(id, pclassInstance);
  }

  @put('/pclassi/{id}', {
    responses: {
      '204': {
        description: 'PClassInstance PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pclassInstance: PClassInstance,
  ): Promise<void> {
    await this.pclassInstanceRepository.replaceById(id, pclassInstance);
  }

  @del('/pclassi/{id}', {
    responses: {
      '204': {
        description: 'PClassInstance DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pclassInstanceRepository.deleteById(id);
  }
}
