import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ppackage,
  Pclass,
} from '../models';
import {PpackageRepository} from '../repositories';

export class PpackagePclassController {
  constructor(
    @repository(PpackageRepository) protected ppackageRepository: PpackageRepository,
  ) { }

  @get('/ppackages/{id}/pclasses', {
    responses: {
      '200': {
        description: 'Array of Ppackage has many Pclass',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pclass)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pclass>,
  ): Promise<Pclass[]> {
    return this.ppackageRepository.pclasses(id).find(filter);
  }

  @post('/ppackages/{id}/pclasses', {
    responses: {
      '200': {
        description: 'Ppackage model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pclass)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ppackage.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pclass, {
            title: 'NewPclassInPpackage',
            exclude: ['_id'],
            optional: ['ppackageid']
          }),
        },
      },
    }) pclass: Omit<Pclass, '_id'>,
  ): Promise<Pclass> {
    return this.ppackageRepository.pclasses(id).create(pclass);
  }

  @patch('/ppackages/{id}/pclasses', {
    responses: {
      '200': {
        description: 'Ppackage.Pclass PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pclass, {partial: true}),
        },
      },
    })
    pclass: Partial<Pclass>,
    @param.query.object('where', getWhereSchemaFor(Pclass)) where?: Where<Pclass>,
  ): Promise<Count> {
    return this.ppackageRepository.pclasses(id).patch(pclass, where);
  }

  @del('/ppackages/{id}/pclasses', {
    responses: {
      '200': {
        description: 'Ppackage.Pclass DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pclass)) where?: Where<Pclass>,
  ): Promise<Count> {
    return this.ppackageRepository.pclasses(id).delete(where);
  }
}
