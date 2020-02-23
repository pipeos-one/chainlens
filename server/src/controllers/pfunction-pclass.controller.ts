import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pfunction,
  Pclass,
} from '../models';
import {PfunctionRepository} from '../repositories';

export class PfunctionPclassController {
  constructor(
    @repository(PfunctionRepository)
    public pfunctionRepository: PfunctionRepository,
  ) { }

  @get('/pfunctions/{id}/pclass', {
    responses: {
      '200': {
        description: 'Pclass belonging to Pfunction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pclass)},
          },
        },
      },
    },
  })
  async getPclass(
    @param.path.string('id') id: typeof Pfunction.prototype._id,
  ): Promise<Pclass> {
    return this.pfunctionRepository.pclass(id);
  }
}
