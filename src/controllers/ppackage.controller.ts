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
import {Ppackage} from '../models';
import {PpackageRepository} from '../repositories';

export class PpackageController {
  constructor(
    @repository(PpackageRepository)
    public ppackageRepository : PpackageRepository,
  ) {}

  @post('/ppackage', {
    responses: {
      '200': {
        description: 'Ppackage model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ppackage)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ppackage, {
            title: 'NewPpackage',
            exclude: ['_id'],
          }),
        },
      },
    })
    ppackage: Omit<Ppackage, '_id'>,
  ): Promise<Ppackage> {
    return this.ppackageRepository.create(ppackage);
  }

  @get('/ppackage/count', {
    responses: {
      '200': {
        description: 'Ppackage model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Ppackage)) where?: Where<Ppackage>,
  ): Promise<Count> {
    return this.ppackageRepository.count(where);
  }

  @get('/ppackage', {
    responses: {
      '200': {
        description: 'Array of Ppackage model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ppackage, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Ppackage)) filter?: Filter<Ppackage>,
  ): Promise<Ppackage[]> {
    return this.ppackageRepository.find(filter);
  }

  @patch('/ppackage', {
    responses: {
      '200': {
        description: 'Ppackage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ppackage, {partial: true}),
        },
      },
    })
    ppackage: Ppackage,
    @param.query.object('where', getWhereSchemaFor(Ppackage)) where?: Where<Ppackage>,
  ): Promise<Count> {
    return this.ppackageRepository.updateAll(ppackage, where);
  }

  @get('/ppackage/{id}', {
    responses: {
      '200': {
        description: 'Ppackage model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ppackage, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Ppackage)) filter?: Filter<Ppackage>
  ): Promise<Ppackage> {
    return this.ppackageRepository.findById(id, filter);
  }

  @patch('/ppackage/{id}', {
    responses: {
      '204': {
        description: 'Ppackage PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ppackage, {partial: true}),
        },
      },
    })
    ppackage: Ppackage,
  ): Promise<void> {
    await this.ppackageRepository.updateById(id, ppackage);
  }

  @put('/ppackage/{id}', {
    responses: {
      '204': {
        description: 'Ppackage PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ppackage: Ppackage,
  ): Promise<void> {
    await this.ppackageRepository.replaceById(id, ppackage);
  }

  @del('/ppackage/{id}', {
    responses: {
      '204': {
        description: 'Ppackage DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ppackageRepository.deleteById(id);
  }
}
