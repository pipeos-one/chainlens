import {Entity, Model, model, property, belongsTo} from '@loopback/repository';
import {Metadata} from './metadata.model';
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
      type: 'number',
    })
    block?: number;  //

    @property({
      type: 'string',
    })
    constructorArgs?: string;  // 0x

    @property({
      type: 'number',
      required: true,
    })
    chainid: number;

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
export class PclassInstance extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    useDefaultIdType: false,
    postgresql: {
      dataType: 'uuid',
      extension: 'pgcrypto',
      defaultFn: 'gen_random_uuid()',
    },
  })
  _id: string;

  @property({
    type: 'number',
  })
  id?: number;

  @property({
    type: 'string',
  })
  pclassid_?: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'uuid',
    },
  })
  ppackageid?: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'uuid',
    },
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
  data: SolidityDeployment | OApiDeployment;

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
