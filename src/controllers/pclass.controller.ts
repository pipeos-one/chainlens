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
import {Pclass} from '../models';
import {PclassRepository} from '../repositories';

export class PclassController {
  constructor(
    @repository(PclassRepository)
    public pclassRepository : PclassRepository,
  ) {}

  @post('/pclass', {
    responses: {
      '200': {
        description: 'Pclass model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pclass)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pclass, {
            title: 'NewPclass',
            exclude: ['_id'],
          }),
        },
      },
    })
    pclass: Omit<Pclass, '_id'>,
  ): Promise<Pclass> {
    return this.pclassRepository.create(pclass);
  }

  @get('/pclass/count', {
    responses: {
      '200': {
        description: 'Pclass model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Pclass)) where?: Where<Pclass>,
  ): Promise<Count> {
    return this.pclassRepository.count(where);
  }

  @get('/pclass', {
    responses: {
      '200': {
        description: 'Array of Pclass model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pclass, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Pclass)) filter?: Filter<Pclass>,
  ): Promise<Pclass[]> {
    return this.pclassRepository.find(filter);
  }

  @patch('/pclass', {
    responses: {
      '200': {
        description: 'Pclass PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pclass, {partial: true}),
        },
      },
    })
    pclass: Pclass,
    @param.query.object('where', getWhereSchemaFor(Pclass)) where?: Where<Pclass>,
  ): Promise<Count> {
    return this.pclassRepository.updateAll(pclass, where);
  }

  @get('/pclass/{id}', {
    responses: {
      '200': {
        description: 'Pclass model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pclass, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Pclass)) filter?: Filter<Pclass>
  ): Promise<Pclass> {
    return this.pclassRepository.findById(id, filter);
  }

  @patch('/pclass/{id}', {
    responses: {
      '204': {
        description: 'Pclass PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pclass, {partial: true}),
        },
      },
    })
    pclass: Pclass,
  ): Promise<void> {
    await this.pclassRepository.updateById(id, pclass);
  }

  @put('/pclass/{id}', {
    responses: {
      '204': {
        description: 'Pclass PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pclass: Pclass,
  ): Promise<void> {
    await this.pclassRepository.replaceById(id, pclass);
  }

  @del('/pclass/{id}', {
    responses: {
      '204': {
        description: 'Pclass DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pclassRepository.deleteById(id);
  }
}
