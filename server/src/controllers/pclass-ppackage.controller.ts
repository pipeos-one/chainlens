import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pclass,
  Ppackage,
} from '../models';
import {PclassRepository} from '../repositories';

export class PclassPpackageController {
  constructor(
    @repository(PclassRepository)
    public pclassRepository: PclassRepository,
  ) { }

  @get('/pclasses/{id}/ppackage', {
    responses: {
      '200': {
        description: 'Ppackage belonging to Pclass',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ppackage)},
          },
        },
      },
    },
  })
  async getPpackage(
    @param.path.string('id') id: typeof Pclass.prototype._id,
  ): Promise<Ppackage> {
    return this.pclassRepository.ppackage(id);
  }
}
