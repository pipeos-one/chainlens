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
import {PPackage} from '../models';
import {PPackageRepository} from '../repositories';

export class PPackageController {
  constructor(
    @repository(PPackageRepository)
    public ppackageRepository : PPackageRepository,
  ) {}

  @post('/ppackage', {
    responses: {
      '200': {
        description: 'PPackage model instance',
        content: {'application/json': {schema: getModelSchemaRef(PPackage)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PPackage, {
            title: 'NewPPackage',
            exclude: ['_id'],
          }),
        },
      },
    })
    ppackage: Omit<PPackage, '_id'>,
  ): Promise<PPackage> {
    return this.ppackageRepository.create(ppackage);
  }

  @get('/ppackage/count', {
    responses: {
      '200': {
        description: 'PPackage model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PPackage)) where?: Where<PPackage>,
  ): Promise<Count> {
    return this.ppackageRepository.count(where);
  }

  @get('/ppackage', {
    responses: {
      '200': {
        description: 'Array of PPackage model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PPackage, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PPackage)) filter?: Filter<PPackage>,
  ): Promise<PPackage[]> {
    return this.ppackageRepository.find(filter);
  }

  @patch('/ppackage', {
    responses: {
      '200': {
        description: 'PPackage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PPackage, {partial: true}),
        },
      },
    })
    ppackage: PPackage,
    @param.query.object('where', getWhereSchemaFor(PPackage)) where?: Where<PPackage>,
  ): Promise<Count> {
    return this.ppackageRepository.updateAll(ppackage, where);
  }

  @get('/ppackage/{id}', {
    responses: {
      '200': {
        description: 'PPackage model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PPackage, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(PPackage)) filter?: Filter<PPackage>
  ): Promise<PPackage> {
    return this.ppackageRepository.findById(id, filter);
  }

  @patch('/ppackage/{id}', {
    responses: {
      '204': {
        description: 'PPackage PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PPackage, {partial: true}),
        },
      },
    })
    ppackage: PPackage,
  ): Promise<void> {
    await this.ppackageRepository.updateById(id, ppackage);
  }

  @put('/ppackage/{id}', {
    responses: {
      '204': {
        description: 'PPackage PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ppackage: PPackage,
  ): Promise<void> {
    await this.ppackageRepository.replaceById(id, ppackage);
  }

  @del('/ppackage/{id}', {
    responses: {
      '204': {
        description: 'PPackage DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ppackageRepository.deleteById(id);
  }
}
