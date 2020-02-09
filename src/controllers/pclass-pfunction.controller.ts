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
  Pclass,
  Pfunction,
} from '../models';
import {PclassRepository} from '../repositories';

export class PclassPfunctionController {
  constructor(
    @repository(PclassRepository) protected pclassRepository: PclassRepository,
  ) { }

  @get('/pclasses/{id}/pfunctions', {
    responses: {
      '200': {
        description: 'Array of Pclass has many Pfunction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pfunction)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pfunction>,
  ): Promise<Pfunction[]> {
    return this.pclassRepository.pfunctions(id).find(filter);
  }

  @post('/pclasses/{id}/pfunctions', {
    responses: {
      '200': {
        description: 'Pclass model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pfunction)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pclass.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pfunction, {
            title: 'NewPfunctionInPclass',
            exclude: ['_id'],
            optional: ['pclassid']
          }),
        },
      },
    }) pfunction: Omit<Pfunction, '_id'>,
  ): Promise<Pfunction> {
    return this.pclassRepository.pfunctions(id).create(pfunction);
  }

  @patch('/pclasses/{id}/pfunctions', {
    responses: {
      '200': {
        description: 'Pclass.Pfunction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pfunction, {partial: true}),
        },
      },
    })
    pfunction: Partial<Pfunction>,
    @param.query.object('where', getWhereSchemaFor(Pfunction)) where?: Where<Pfunction>,
  ): Promise<Count> {
    return this.pclassRepository.pfunctions(id).patch(pfunction, where);
  }

  @del('/pclasses/{id}/pfunctions', {
    responses: {
      '200': {
        description: 'Pclass.Pfunction DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pfunction)) where?: Where<Pfunction>,
  ): Promise<Count> {
    return this.pclassRepository.pfunctions(id).delete(where);
  }
}
