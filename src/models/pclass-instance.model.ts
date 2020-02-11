import {Entity, Model, model, property, belongsTo} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {Compiler, CompilerOutput} from './compiler.model';
import {Pclass} from './pclass.model';

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
    txhash?: string;  // 0x

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
    postgresql: {
      dataType: "json",
    },
  })
  compiler: Compiler;

  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
  })
  compilerOutput: CompilerOutput;

  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
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
  })
  dtypeid?: string;

  @property({
    type: 'object',
    required: true,
    default: {},
    postgresql: {
      dataType: "json",
    },
  })
  data: PclassInstanceData;

  @property({
    type: 'object',
    required: true,
    default: {},
    postgresql: {
      dataType: "jsonb",
    },
  })
  metadata: Metadata;

  @property({
    type: 'object',
    required: true,
    default: {},
    postgresql: {
      dataType: "json",
    },
  })
  extra: object;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  timestamp: string;

  @belongsTo(() => Pclass, {name: 'pclass'})
  pclassid: string;

  constructor(data?: Partial<PclassInstance>) {
    super(data);
  }
}

export interface PclassInstanceRelations {
  // describe navigational properties here
}

export type PclassInstanceWithRelations = PclassInstance & PclassInstanceRelations;
