import {Entity, Model, model, property} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {Compiler, CompilerOutput} from './compiler.model';


@model()
export class OApiDeployment extends Model {
    @property({
      type: 'string',
      required: true,
    })
    host: string;

    @property({
      type: 'string',
      required: true,
    })
    basePath: string;

    @property({
      type: 'string',
    })
    oapiid?: string;
}

@model()
export class SolidityDeployment extends Model {
    @property({
      type: 'string',
      required: true,
    })
    address: string;

    @property({
      type: 'string',
    })
    transaction?: string;  // 0x

    @property({
      type: 'string',
    })
    block?: string;  // 0x

    @property({
      type: 'string',
    })
    constructorArgs?: string;  // 0x

    @property({
      type: 'string',
      required: true,
    })
    chainid: string;

    @property({
       type: 'string',
    })
    genesis_hash?: string;

    @property({
       type: 'string',
    })
    block_hash?: string;

    @property({
       type: 'string',
    })
    bip122_uri?: string;
}


@model()
export class PclassInstanceData extends Model {
  @property({
    type: 'object',
  })
  compiler: Compiler;

  @property({
    type: 'object',
  })
  compilerOutput: CompilerOutput;

  @property({
    type: 'object',
  })
  deployment: SolidityDeployment | OApiDeployment;

  constructor(data?: Partial<PclassInstanceData>) {
    super(data);
  }
}


@model()
export class PclassInstance extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'string',
  })
  packageid?: string;

  @property({
    type: 'string',
    required: true,
  })
  pclassid: string;

  @property({
    type: 'string',
  })
  dtypeid?: string;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  data: PclassInstanceData;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  metadata: Metadata;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  extra: object;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  timestamp: string;


  constructor(data?: Partial<PclassInstance>) {
    super(data);
  }
}

export interface PclassInstanceRelations {
  // describe navigational properties here
}

export type PclassInstanceWithRelations = PclassInstance & PclassInstanceRelations;
