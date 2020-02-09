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
import {PClass} from '../models';
import {PClassRepository} from '../repositories';

export class PClassController {
  constructor(
    @repository(PClassRepository)
    public pclassRepository : PClassRepository,
  ) {}

  @post('/pclass', {
    responses: {
      '200': {
        description: 'PClass model instance',
        content: {'application/json': {schema: getModelSchemaRef(PClass)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PClass, {
            title: 'NewPClass',
            exclude: ['_id'],
          }),
        },
      },
    })
    pclass: Omit<PClass, '_id'>,
  ): Promise<PClass> {
    return this.pclassRepository.create(pclass);
  }

  @get('/pclass/count', {
    responses: {
      '200': {
        description: 'PClass model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PClass)) where?: Where<PClass>,
  ): Promise<Count> {
    return this.pclassRepository.count(where);
  }

  @get('/pclass', {
    responses: {
      '200': {
        description: 'Array of PClass model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PClass, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PClass)) filter?: Filter<PClass>,
  ): Promise<PClass[]> {
    return this.pclassRepository.find(filter);
  }

  @patch('/pclass', {
    responses: {
      '200': {
        description: 'PClass PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PClass, {partial: true}),
        },
      },
    })
    pclass: PClass,
    @param.query.object('where', getWhereSchemaFor(PClass)) where?: Where<PClass>,
  ): Promise<Count> {
    return this.pclassRepository.updateAll(pclass, where);
  }

  @get('/pclass/{id}', {
    responses: {
      '200': {
        description: 'PClass model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PClass, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(PClass)) filter?: Filter<PClass>
  ): Promise<PClass> {
    return this.pclassRepository.findById(id, filter);
  }

  @patch('/pclass/{id}', {
    responses: {
      '204': {
        description: 'PClass PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PClass, {partial: true}),
        },
      },
    })
    pclass: PClass,
  ): Promise<void> {
    await this.pclassRepository.updateById(id, pclass);
  }

  @put('/pclass/{id}', {
    responses: {
      '204': {
        description: 'PClass PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pclass: PClass,
  ): Promise<void> {
    await this.pclassRepository.replaceById(id, pclass);
  }

  @del('/pclass/{id}', {
    responses: {
      '204': {
        description: 'PClass DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pclassRepository.deleteById(id);
  }
}
