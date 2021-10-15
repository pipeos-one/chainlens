import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  GapiFunction,
  Natspec, Pclass,
  Pfunction
} from '../models';
import {PclassRepository} from '../repositories';
import {getSignature, getSignatureString} from '../utils/gapi';

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

  @get('/pclasses/{id}/pfunctions/build', {
    responses: {
      '200': {
        description: 'Pclass.Pfunction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async createFunctionsFromPClass(
    @param.path.string('id') id: typeof Pclass.prototype._id,
  ): Promise<Count> {
    const count: Count = {count: 0};
    const pclass: Pclass = await this.pclassRepository.findById(id);

    const emptydoc = {methods: {}};
    const gapi: GapiFunction[] = pclass.data.gapi || [];
    const natspec: Natspec = pclass.data.natspec || emptydoc;

    const existCount = await this.pclassRepository.pfunctions(id).find();
    if (existCount.length === gapi.length) {
      count.count = existCount.length;
      return count;
    }

    for (const funcapi of gapi) {
      // const funcapi: GapiFunction = gapi[i];

      const exists = await this.pclassRepository.pfunctions(id).find(
        JSON.parse(JSON.stringify({where: {'data.name': funcapi.name}}))
      );
      if (exists && exists.length > 0) {
        continue;
      }

      const signature: string = getSignature(funcapi);
      const signatureString: string = getSignatureString(funcapi);
      // TODO? sourceByFunctionName: any;
      // sourceByFunctionName = (<JsClass>pclass.pclass).sourceByFunctionName;
      // const sources: PFunctionSources = {};
      // if (sourceByFunctionName) {
      //   sources[pclass.type] = sourceByFunctionName[funcapi.name];
      // }
      const functiondoc = {
        data: {
          name: funcapi.name,
          signature,
          signatureString,
          gapi: funcapi,
          natspec: natspec.methods[signatureString],
          // sources,
        },
        metadata: pclass.metadata,
        timestamp: pclass.timestamp,
      }
      const pfunction = await this.pclassRepository.pfunctions(id).create(functiondoc);

      const created = await this.pclassRepository.pfunctions(id).find({where: {_id: pfunction._id}});
      if (!created || created.length === 0) {
        throw new Error(`Function ${functiondoc.data.gapi}was not created.`)
      };
      count.count += 1;
    };

    return count;
  }
}

