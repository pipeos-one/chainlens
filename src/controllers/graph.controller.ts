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
import {Graph} from '../models';
import {GraphRepository} from '../repositories';

export class GraphController {
  constructor(
    @repository(GraphRepository)
    public graphRepository : GraphRepository,
  ) {}

  @post('/graph', {
    responses: {
      '200': {
        description: 'Graph model instance',
        content: {'application/json': {schema: getModelSchemaRef(Graph)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Graph, {
            title: 'NewGraph',
            exclude: ['_id'],
          }),
        },
      },
    })
    graph: Omit<Graph, '_id'>,
  ): Promise<Graph> {
    return this.graphRepository.create(graph);
  }

  @get('/graph/count', {
    responses: {
      '200': {
        description: 'Graph model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Graph)) where?: Where<Graph>,
  ): Promise<Count> {
    return this.graphRepository.count(where);
  }

  @get('/graph', {
    responses: {
      '200': {
        description: 'Array of Graph model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Graph, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Graph)) filter?: Filter<Graph>,
  ): Promise<Graph[]> {
    return this.graphRepository.find(filter);
  }

  @patch('/graph', {
    responses: {
      '200': {
        description: 'Graph PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Graph, {partial: true}),
        },
      },
    })
    graph: Graph,
    @param.query.object('where', getWhereSchemaFor(Graph)) where?: Where<Graph>,
  ): Promise<Count> {
    return this.graphRepository.updateAll(graph, where);
  }

  @get('/graph/{id}', {
    responses: {
      '200': {
        description: 'Graph model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Graph, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Graph)) filter?: Filter<Graph>
  ): Promise<Graph> {
    return this.graphRepository.findById(id, filter);
  }

  @patch('/graph/{id}', {
    responses: {
      '204': {
        description: 'Graph PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Graph, {partial: true}),
        },
      },
    })
    graph: Graph,
  ): Promise<void> {
    await this.graphRepository.updateById(id, graph);
  }

  @put('/graph/{id}', {
    responses: {
      '204': {
        description: 'Graph PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() graph: Graph,
  ): Promise<void> {
    await this.graphRepository.replaceById(id, graph);
  }

  @del('/graph/{id}', {
    responses: {
      '204': {
        description: 'Graph DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.graphRepository.deleteById(id);
  }
}
