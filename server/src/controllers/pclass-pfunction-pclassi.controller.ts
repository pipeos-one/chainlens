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
  PclassSolidityClassic,
} from '../models';
import {PclassRepository} from '../repositories';
import {
  similarPclassBytecodeFilter,
  buildPclassFromBare,
} from '../utils/pclass';
import {PclassController} from '../controllers';

export class PclassPfunctionPclassiController {
  constructor(
    @repository(PclassRepository) public pclassRepository: PclassRepository,
  ) { }

  @get('/pclassall', {
    responses: {
      '200': {
        description: 'Array of Pclass has many Pfunction and many PclassInstances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pclass)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter') filter?: Filter<Pclass>,
  ): Promise<Pclass[]> {
    filter = filter || {};
    filter.include = [{relation: 'pfunctions'}, {relation: 'pclassInstances'}];
    return this.pclassRepository.find(filter);
  }

  @post('/pclasses/pfunctions/pclassii', {
    responses: {
      '200': {
        description: 'Pclass model instance',
        content: {'application/json': {schema: getModelSchemaRef(PclassSolidityClassic)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PclassSolidityClassic, {
            title: 'NewPclassPFunctionsPClassi',
            // partial: true,
          }),
        },
      },
    }) scontract: PclassSolidityClassic,
  ): Promise<Boolean> {
    console.log('scontract', scontract.contractName);
    let pclassController = new PclassController(this.pclassRepository);
    let newPclass: any = {};
    let builtPclass: any = {};

    const similarFilter = similarPclassBytecodeFilter(scontract.bytecode);
    // const similar = await this.pclassRepository.find(similarFilter);
    const similar = await this.pclassRepository.find({});
    console.log('alreadyInserted', similar.length);
    newPclass = similar[0];

    if (!newPclass) {
      builtPclass = buildPclassFromBare(scontract);
      newPclass = await pclassController.create(builtPclass.pclass).catch(e => console.log('create err', builtPclass.name, e));
      if (!newPclass) {
          throw new Error('no newPclass inserted ' + newPclass.name);
      }

      // await this.createFunctionsFromPClass((<PClass>newPclass)).catch((e: Error) => {
      //     this.deletePClassFunctions((<PClass>newPclass)._id);
      //     return this.deleteById((<PClass>newPclass)._id);
      // });
    } else {
      // insert pclassi
    }

    // return this.pclassRepository.pfunctions(id).create(pfunction);
    return true;
  }
}
