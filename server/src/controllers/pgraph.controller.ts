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
import {Pgraph} from '../models';
import {PgraphRepository} from '../repositories';

export class PgraphController {
  constructor(
    @repository(PgraphRepository)
    public pgraphRepository : PgraphRepository,
  ) {}

  @post('/graph')
  @response(200, {
    description: 'Pgraph model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pgraph)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pgraph, {
            title: 'NewPgraph',
            exclude: ['_id'],
          }),
        },
      },
    })
    pgraph: Omit<Pgraph, '_id'>,
  ): Promise<Pgraph> {
    return this.pgraphRepository.create(pgraph);
  }

  @get('/graph/count')
  @response(200, {
    description: 'Pgraph model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pgraph) where?: Where<Pgraph>,
  ): Promise<Count> {
    return this.pgraphRepository.count(where);
  }

  @get('/graph')
  @response(200, {
    description: 'Array of Pgraph model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pgraph, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pgraph) filter?: Filter<Pgraph>,
  ): Promise<Pgraph[]> {
    return this.pgraphRepository.find(filter);
  }

  @patch('/graph')
  @response(200, {
    description: 'Pgraph PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pgraph, {partial: true}),
        },
      },
    })
    pgraph: Pgraph,
    @param.where(Pgraph) where?: Where<Pgraph>,
  ): Promise<Count> {
    return this.pgraphRepository.updateAll(pgraph, where);
  }

  @get('/graph/{id}')
  @response(200, {
    description: 'Pgraph model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pgraph, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pgraph, {exclude: 'where'}) filter?: FilterExcludingWhere<Pgraph>
  ): Promise<Pgraph> {
    return this.pgraphRepository.findById(id, filter);
  }

  @patch('/graph/{id}')
  @response(204, {
    description: 'Pgraph PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pgraph, {partial: true}),
        },
      },
    })
    pgraph: Pgraph,
  ): Promise<void> {
    await this.pgraphRepository.updateById(id, pgraph);
  }

  @put('/graph/{id}')
  @response(204, {
    description: 'Pgraph PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pgraph: Pgraph,
  ): Promise<void> {
    await this.pgraphRepository.replaceById(id, pgraph);
  }

  @del('/graph/{id}')
  @response(204, {
    description: 'Pgraph DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pgraphRepository.deleteById(id);
  }
}
