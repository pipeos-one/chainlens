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
  PclassInstance,
} from '../models';
import {PclassRepository} from '../repositories';

export class PclassPclassInstanceController {
  constructor(
    @repository(PclassRepository) protected pclassRepository: PclassRepository,
  ) { }

  @get('/pclasses/{id}/pclass-instances', {
    responses: {
      '200': {
        description: 'Array of Pclass has many PclassInstance',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PclassInstance)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PclassInstance>,
  ): Promise<PclassInstance[]> {
    return this.pclassRepository.pclassInstances(id).find(filter);
  }

  @post('/pclasses/{id}/pclass-instances', {
    responses: {
      '200': {
        description: 'Pclass model instance',
        content: {'application/json': {schema: getModelSchemaRef(PclassInstance)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pclass.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PclassInstance, {
            title: 'NewPclassInstanceInPclass',
            exclude: ['_id'],
            optional: ['pclassid']
          }),
        },
      },
    }) pclassInstance: Omit<PclassInstance, '_id'>,
  ): Promise<PclassInstance> {
    return this.pclassRepository.pclassInstances(id).create(pclassInstance);
  }

  @patch('/pclasses/{id}/pclass-instances', {
    responses: {
      '200': {
        description: 'Pclass.PclassInstance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PclassInstance, {partial: true}),
        },
      },
    })
    pclassInstance: Partial<PclassInstance>,
    @param.query.object('where', getWhereSchemaFor(PclassInstance)) where?: Where<PclassInstance>,
  ): Promise<Count> {
    return this.pclassRepository.pclassInstances(id).patch(pclassInstance, where);
  }

  @del('/pclasses/{id}/pclass-instances', {
    responses: {
      '200': {
        description: 'Pclass.PclassInstance DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PclassInstance)) where?: Where<PclassInstance>,
  ): Promise<Count> {
    return this.pclassRepository.pclassInstances(id).delete(where);
  }
}
