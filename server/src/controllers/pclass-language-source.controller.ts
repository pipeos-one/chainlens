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
  LanguageSource,
} from '../models';
import {PclassRepository} from '../repositories';

export class PclassLanguageSourceController {
  constructor(
    @repository(PclassRepository) protected pclassRepository: PclassRepository,
  ) { }

  @get('/pclasses/{id}/language-sources', {
    responses: {
      '200': {
        description: 'Array of Pclass has many LanguageSource',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LanguageSource)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LanguageSource>,
  ): Promise<LanguageSource[]> {
    return this.pclassRepository.sources(id).find(filter);
  }

  @post('/pclasses/{id}/language-sources', {
    responses: {
      '200': {
        description: 'Pclass model instance',
        content: {'application/json': {schema: getModelSchemaRef(LanguageSource)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pclass.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LanguageSource, {
            title: 'NewLanguageSourceInPclass',
            exclude: ['_id'],
            optional: ['pclassid']
          }),
        },
      },
    }) languageSource: Omit<LanguageSource, '_id'>,
  ): Promise<LanguageSource> {
    return this.pclassRepository.sources(id).create(languageSource);
  }

  @patch('/pclasses/{id}/language-sources', {
    responses: {
      '200': {
        description: 'Pclass.LanguageSource PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LanguageSource, {partial: true}),
        },
      },
    })
    languageSource: Partial<LanguageSource>,
    @param.query.object('where', getWhereSchemaFor(LanguageSource)) where?: Where<LanguageSource>,
  ): Promise<Count> {
    return this.pclassRepository.sources(id).patch(languageSource, where);
  }

  @del('/pclasses/{id}/language-sources', {
    responses: {
      '200': {
        description: 'Pclass.LanguageSource DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LanguageSource)) where?: Where<LanguageSource>,
  ): Promise<Count> {
    return this.pclassRepository.sources(id).delete(where);
  }
}
