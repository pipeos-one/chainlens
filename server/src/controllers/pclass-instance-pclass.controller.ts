import {
  repository,
  Count,
  CountSchema,
  Filter,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
  getFilterSchemaFor,
} from '@loopback/rest';
import {
  PclassInstance,
  Pclass,
} from '../models';
import {PclassInstanceRepository, PclassRepository} from '../repositories';

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

  // @get('/pclassi-instances/updatePclassid', {
  //   responses: {
  //     '200': {
  //       description: 'Array of PclassInstance model instances',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async updatePclassid(
  //   @param.query.object('filter', getFilterSchemaFor(PclassInstance)) filter?: Filter<PclassInstance>,
  // ): Promise<Count> {
  //   let pclassRepository = await this.pclassInstanceRepository.pclassInternal;
  //   const pclassii = await this.pclassInstanceRepository.find(filter);
  //   let count = 0;
  //
  //   for (let i = 0; i < pclassii.length; i++) {
  //     const pclassi = pclassii[i];
  //     let pclass: any;
  //     try {
  //       const pclassQ: Pclass[] = await pclassRepository.find({where: {id: pclassi.pclassid_}});
  //       pclass = pclassQ[0];
  //     }
  //     catch (e) {
  //       console.error('pclassid not updated for ', pclassi._id);
  //     }
  //
  //     if (pclass) {
  //       await this.pclassInstanceRepository.updateById(pclassi._id, {pclassid: pclass._id}).catch(console.error);
  //       count += 1;
  //     }
  //   }
  //   return {count: count};
  // }
}
