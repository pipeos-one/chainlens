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
import {PFunction} from '../models';
import {PFunctionRepository} from '../repositories';

export class PFunctionController {
  constructor(
    @repository(PFunctionRepository)
    public pfunctionRepository : PFunctionRepository,
  ) {}

  @post('/pfunction', {
    responses: {
      '200': {
        description: 'PFunction model instance',
        content: {'application/json': {schema: getModelSchemaRef(PFunction)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PFunction, {
            title: 'NewPFunction',
            exclude: ['_id'],
          }),
        },
      },
    })
    pfunction: Omit<PFunction, '_id'>,
  ): Promise<PFunction> {
    return this.pfunctionRepository.create(pfunction);
  }

  @get('/pfunction/count', {
    responses: {
      '200': {
        description: 'PFunction model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PFunction)) where?: Where<PFunction>,
  ): Promise<Count> {
    return this.pfunctionRepository.count(where);
  }

  @get('/pfunction', {
    responses: {
      '200': {
        description: 'Array of PFunction model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PFunction, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PFunction)) filter?: Filter<PFunction>,
  ): Promise<PFunction[]> {
    return this.pfunctionRepository.find(filter);
  }

  @patch('/pfunction', {
    responses: {
      '200': {
        description: 'PFunction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PFunction, {partial: true}),
        },
      },
    })
    pfunction: PFunction,
    @param.query.object('where', getWhereSchemaFor(PFunction)) where?: Where<PFunction>,
  ): Promise<Count> {
    return this.pfunctionRepository.updateAll(pfunction, where);
  }

  @get('/pfunction/{id}', {
    responses: {
      '200': {
        description: 'PFunction model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PFunction, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(PFunction)) filter?: Filter<PFunction>
  ): Promise<PFunction> {
    return this.pfunctionRepository.findById(id, filter);
  }

  @patch('/pfunction/{id}', {
    responses: {
      '204': {
        description: 'PFunction PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PFunction, {partial: true}),
        },
      },
    })
    pfunction: PFunction,
  ): Promise<void> {
    await this.pfunctionRepository.updateById(id, pfunction);
  }

  @put('/pfunction/{id}', {
    responses: {
      '204': {
        description: 'PFunction PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pfunction: PFunction,
  ): Promise<void> {
    await this.pfunctionRepository.replaceById(id, pfunction);
  }

  @del('/pfunction/{id}', {
    responses: {
      '204': {
        description: 'PFunction DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pfunctionRepository.deleteById(id);
  }
}
