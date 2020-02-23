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
import {Pgraph} from '../models';
import {PgraphRepository} from '../repositories';

export class PgraphController {
  constructor(
    @repository(PgraphRepository)
    public graphRepository : PgraphRepository,
  ) {}

  @post('/graph', {
    responses: {
      '200': {
        description: 'Pgraph model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pgraph)}},
      },
    },
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
    graph: Omit<Pgraph, '_id'>,
  ): Promise<Pgraph> {
    return this.graphRepository.create(graph);
  }

  @get('/graph/count', {
    responses: {
      '200': {
        description: 'Pgraph model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Pgraph)) where?: Where<Pgraph>,
  ): Promise<Count> {
    return this.graphRepository.count(where);
  }

  @get('/graph', {
    responses: {
      '200': {
        description: 'Array of Pgraph model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pgraph, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Pgraph)) filter?: Filter<Pgraph>,
  ): Promise<Pgraph[]> {
    return this.graphRepository.find(filter);
  }

  @patch('/graph', {
    responses: {
      '200': {
        description: 'Pgraph PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pgraph, {partial: true}),
        },
      },
    })
    graph: Pgraph,
    @param.query.object('where', getWhereSchemaFor(Pgraph)) where?: Where<Pgraph>,
  ): Promise<Count> {
    return this.graphRepository.updateAll(graph, where);
  }

  @get('/graph/{id}', {
    responses: {
      '200': {
        description: 'Pgraph model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pgraph, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Pgraph)) filter?: Filter<Pgraph>
  ): Promise<Pgraph> {
    return this.graphRepository.findById(id, filter);
  }

  @patch('/graph/{id}', {
    responses: {
      '204': {
        description: 'Pgraph PATCH success',
      },
    },
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
    graph: Pgraph,
  ): Promise<void> {
    await this.graphRepository.updateById(id, graph);
  }

  @put('/graph/{id}', {
    responses: {
      '204': {
        description: 'Pgraph PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() graph: Pgraph,
  ): Promise<void> {
    await this.graphRepository.replaceById(id, graph);
  }

  @del('/graph/{id}', {
    responses: {
      '204': {
        description: 'Pgraph DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.graphRepository.deleteById(id);
  }
}
