import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PclassInstance,
  Pclass,
} from '../models';
import {PclassInstanceRepository} from '../repositories';

export class PclassInstancePclassController {
  constructor(
    @repository(PclassInstanceRepository)
    public pclassInstanceRepository: PclassInstanceRepository,
  ) { }

  @get('/pclass-instances/{id}/pclass', {
    responses: {
      '200': {
        description: 'Pclass belonging to PclassInstance',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pclass)},
          },
        },
      },
    },
  })
  async getPclass(
    @param.path.string('id') id: typeof PclassInstance.prototype._id,
  ): Promise<Pclass> {
    return this.pclassInstanceRepository.pclass(id);
  }
}
