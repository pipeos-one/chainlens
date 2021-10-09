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
import {TypeInstance} from '../models';
import {TypeInstanceRepository} from '../repositories';

export class TypeInstanceController {
  constructor(
    @repository(TypeInstanceRepository)
    public typeInstanceRepository : TypeInstanceRepository,
  ) {}

  @post('/dtypei', {
    responses: {
      '200': {
        description: 'TypeInstance model instance',
        content: {'application/json': {schema: getModelSchemaRef(TypeInstance)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeInstance, {
            title: 'NewTypeInstance',
            exclude: ['_id'],
          }),
        },
      },
    })
    typeInstance: Omit<TypeInstance, '_id'>,
  ): Promise<TypeInstance> {
    return this.typeInstanceRepository.create(typeInstance);
  }

  @get('/dtypei/count', {
    responses: {
      '200': {
        description: 'TypeInstance model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TypeInstance)) where?: Where<TypeInstance>,
  ): Promise<Count> {
    return this.typeInstanceRepository.count(where);
  }

  @get('/dtypei', {
    responses: {
      '200': {
        description: 'Array of TypeInstance model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TypeInstance, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TypeInstance)) filter?: Filter<TypeInstance>,
  ): Promise<TypeInstance[]> {
    return this.typeInstanceRepository.find(filter);
  }

  @patch('/dtypei', {
    responses: {
      '200': {
        description: 'TypeInstance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeInstance, {partial: true}),
        },
      },
    })
    typeInstance: TypeInstance,
    @param.query.object('where', getWhereSchemaFor(TypeInstance)) where?: Where<TypeInstance>,
  ): Promise<Count> {
    return this.typeInstanceRepository.updateAll(typeInstance, where);
  }

  @get('/dtypei/{id}', {
    responses: {
      '200': {
        description: 'TypeInstance model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TypeInstance, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(TypeInstance)) filter?: Filter<TypeInstance>
  ): Promise<TypeInstance> {
    return this.typeInstanceRepository.findById(id, filter);
  }

  @patch('/dtypei/{id}', {
    responses: {
      '204': {
        description: 'TypeInstance PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeInstance, {partial: true}),
        },
      },
    })
    typeInstance: TypeInstance,
  ): Promise<void> {
    await this.typeInstanceRepository.updateById(id, typeInstance);
  }

  @put('/dtypei/{id}', {
    responses: {
      '204': {
        description: 'TypeInstance PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() typeInstance: TypeInstance,
  ): Promise<void> {
    await this.typeInstanceRepository.replaceById(id, typeInstance);
  }

  @del('/dtypei/{id}', {
    responses: {
      '204': {
        description: 'TypeInstance DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.typeInstanceRepository.deleteById(id);
  }
}
