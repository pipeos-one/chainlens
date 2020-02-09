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
import {Package} from '../models';
import {PackageRepository} from '../repositories';

export class PackageController {
  constructor(
    @repository(PackageRepository)
    public packageRepository : PackageRepository,
  ) {}

  @post('/package', {
    responses: {
      '200': {
        description: 'Package model instance',
        content: {'application/json': {schema: getModelSchemaRef(Package)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Package, {
            title: 'NewPackage',
            exclude: ['_id'],
          }),
        },
      },
    })
    package: Omit<Package, '_id'>,
  ): Promise<Package> {
    return this.packageRepository.create(package);
  }

  @get('/package/count', {
    responses: {
      '200': {
        description: 'Package model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Package)) where?: Where<Package>,
  ): Promise<Count> {
    return this.packageRepository.count(where);
  }

  @get('/package', {
    responses: {
      '200': {
        description: 'Array of Package model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Package, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Package)) filter?: Filter<Package>,
  ): Promise<Package[]> {
    return this.packageRepository.find(filter);
  }

  @patch('/package', {
    responses: {
      '200': {
        description: 'Package PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Package, {partial: true}),
        },
      },
    })
    package: Package,
    @param.query.object('where', getWhereSchemaFor(Package)) where?: Where<Package>,
  ): Promise<Count> {
    return this.packageRepository.updateAll(package, where);
  }

  @get('/package/{id}', {
    responses: {
      '200': {
        description: 'Package model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Package, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Package)) filter?: Filter<Package>
  ): Promise<Package> {
    return this.packageRepository.findById(id, filter);
  }

  @patch('/package/{id}', {
    responses: {
      '204': {
        description: 'Package PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Package, {partial: true}),
        },
      },
    })
    package: Package,
  ): Promise<void> {
    await this.packageRepository.updateById(id, package);
  }

  @put('/package/{id}', {
    responses: {
      '204': {
        description: 'Package PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() package: Package,
  ): Promise<void> {
    await this.packageRepository.replaceById(id, package);
  }

  @del('/package/{id}', {
    responses: {
      '204': {
        description: 'Package DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.packageRepository.deleteById(id);
  }
}
