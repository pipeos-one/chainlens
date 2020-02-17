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
import {Pfunction} from '../models';
import {PfunctionRepository} from '../repositories';
import {gapiFilter} from '../utils/filter';

export class PfunctionController {
  constructor(
    @repository(PfunctionRepository)
    public pfunctionRepository : PfunctionRepository,
  ) {}

  @post('/pfunction', {
    responses: {
      '200': {
        description: 'Pfunction model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pfunction)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pfunction, {
            title: 'NewPfunction',
            exclude: ['_id'],
          }),
        },
      },
    })
    pfunction: Omit<Pfunction, '_id'>,
  ): Promise<Pfunction> {
    return this.pfunctionRepository.create(pfunction);
  }

  @get('/pfunction/count', {
    responses: {
      '200': {
        description: 'Pfunction model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Pfunction)) where?: Where<Pfunction>,
  ): Promise<Count> {
    const lowlevelQuery = gapiFilter('pfunction', { where }, 'COUNT(*)');
    if (!lowlevelQuery) {
      return this.pfunctionRepository.count(where);
    }
    const result = await this.pfunctionRepository.dataSource.execute(lowlevelQuery);
    if (result && result.length > 0) {
      return result[0];
    }
    return {count: 0};
  }

  @get('/pfunction', {
    responses: {
      '200': {
        description: 'Array of Pfunction model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pfunction, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Pfunction)) filter?: Filter<Pfunction>,
  ): Promise<Pfunction[]> {
    const lowlevelQuery = gapiFilter('pfunction', filter);
    if (!lowlevelQuery) {
      return this.pfunctionRepository.find(filter);
    }
    return this.pfunctionRepository.dataSource.execute(lowlevelQuery);
  }

  @patch('/pfunction', {
    responses: {
      '200': {
        description: 'Pfunction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pfunction, {partial: true}),
        },
      },
    })
    pfunction: Pfunction,
    @param.query.object('where', getWhereSchemaFor(Pfunction)) where?: Where<Pfunction>,
  ): Promise<Count> {
    return this.pfunctionRepository.updateAll(pfunction, where);
  }

  @get('/pfunction/{id}', {
    responses: {
      '200': {
        description: 'Pfunction model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pfunction, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Pfunction)) filter?: Filter<Pfunction>
  ): Promise<Pfunction> {
    return this.pfunctionRepository.findById(id, filter);
  }

  @patch('/pfunction/{id}', {
    responses: {
      '204': {
        description: 'Pfunction PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pfunction, {partial: true}),
        },
      },
    })
    pfunction: Pfunction,
  ): Promise<void> {
    await this.pfunctionRepository.updateById(id, pfunction);
  }

  @put('/pfunction/{id}', {
    responses: {
      '204': {
        description: 'Pfunction PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pfunction: Pfunction,
  ): Promise<void> {
    await this.pfunctionRepository.replaceById(id, pfunction);
  }

  @del('/pfunction/{id}', {
    responses: {
      '204': {
        description: 'Pfunction DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pfunctionRepository.deleteById(id);
  }
}
