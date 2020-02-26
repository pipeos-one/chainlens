import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  LanguageSource,
  Pclass,
} from '../models';
import {LanguageSourceRepository} from '../repositories';

export class LanguageSourcePclassController {
  constructor(
    @repository(LanguageSourceRepository)
    public languageSourceRepository: LanguageSourceRepository,
  ) { }

  @get('/language-sources/{id}/pclass', {
    responses: {
      '200': {
        description: 'Pclass belonging to LanguageSource',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pclass)},
          },
        },
      },
    },
  })
  async getPclass(
    @param.path.string('id') id: typeof LanguageSource.prototype._id,
  ): Promise<Pclass> {
    return this.languageSourceRepository.pclass(id);
  }
}
