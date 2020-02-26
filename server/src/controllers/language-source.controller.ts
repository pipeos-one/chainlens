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
import {LanguageSource} from '../models';
import {LanguageSourceRepository} from '../repositories';

export class LanguageSourceController {
  constructor(
    @repository(LanguageSourceRepository)
    public languageSourceRepository : LanguageSourceRepository,
  ) {}

  @post('/sources', {
    responses: {
      '200': {
        description: 'LanguageSource model instance',
        content: {'application/json': {schema: getModelSchemaRef(LanguageSource)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LanguageSource, {
            title: 'NewLanguageSource',
            exclude: ['_id'],
          }),
        },
      },
    })
    languageSource: Omit<LanguageSource, '_id'>,
  ): Promise<LanguageSource> {
    return this.languageSourceRepository.create(languageSource);
  }

  @get('/sources/count', {
    responses: {
      '200': {
        description: 'LanguageSource model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(LanguageSource)) where?: Where<LanguageSource>,
  ): Promise<Count> {
    return this.languageSourceRepository.count(where);
  }

  @get('/sources', {
    responses: {
      '200': {
        description: 'Array of LanguageSource model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(LanguageSource, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(LanguageSource)) filter?: Filter<LanguageSource>,
  ): Promise<LanguageSource[]> {
    return this.languageSourceRepository.find(filter);
  }

  @patch('/sources', {
    responses: {
      '200': {
        description: 'LanguageSource PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LanguageSource, {partial: true}),
        },
      },
    })
    languageSource: LanguageSource,
    @param.query.object('where', getWhereSchemaFor(LanguageSource)) where?: Where<LanguageSource>,
  ): Promise<Count> {
    return this.languageSourceRepository.updateAll(languageSource, where);
  }

  @get('/sources/{id}', {
    responses: {
      '200': {
        description: 'LanguageSource model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LanguageSource, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(LanguageSource)) filter?: Filter<LanguageSource>
  ): Promise<LanguageSource> {
    return this.languageSourceRepository.findById(id, filter);
  }

  @patch('/sources/{id}', {
    responses: {
      '204': {
        description: 'LanguageSource PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LanguageSource, {partial: true}),
        },
      },
    })
    languageSource: LanguageSource,
  ): Promise<void> {
    await this.languageSourceRepository.updateById(id, languageSource);
  }

  @put('/sources/{id}', {
    responses: {
      '204': {
        description: 'LanguageSource PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() languageSource: LanguageSource,
  ): Promise<void> {
    await this.languageSourceRepository.replaceById(id, languageSource);
  }

  @del('/sources/{id}', {
    responses: {
      '204': {
        description: 'LanguageSource DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.languageSourceRepository.deleteById(id);
  }
}
