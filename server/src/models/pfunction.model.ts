import {Entity, Model, model, property, belongsTo} from '@loopback/repository';
import {GapiFunction} from './gapi.model';
import {Metadata} from './metadata.model';
import {NatspecMethod} from './natspec.model';
import {SourceByLanguage} from './sources.model';
import {Pclass} from './pclass.model';

@model()
export class PfunctionData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  signatureString: string;

  // bytes4
  @property({
    type: 'string',
    required: true,
  })
  signature: string;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "jsonb",
    },
  })
  gapi: GapiFunction;

  @property({
    type: 'object',
    required: true,
    default: {},
    postgresql: {
      dataType: "json",
    },
  })
  natspec: NatspecMethod;

  @property({
    type: 'object',
    default: {},
    postgresql: {
      dataType: "json",
    },
  })
  sourceByLanguage?: SourceByLanguage;

  constructor(data?: Partial<PfunctionData>) {
    super(data);
  }
}


@model()
export class Pfunction extends Entity {
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
    type: 'string',
    postgresql: {
      dataType: 'uuid',
    },
  })
  dtypeid?: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'uuid',
    },
  })
  graphid?: string;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "json",
    },
  })
  data: PfunctionData;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "jsonb",
    },
  })
  metadata: Metadata;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  timestamp: string;

  @belongsTo(() => Pclass, {name: 'pclass'})
  pclassid: string;

  constructor(data?: Partial<Pfunction>) {
    super(data);
  }
}

export interface PfunctionRelations {
  // describe navigational properties here
}

export type PfunctionWithRelations = Pfunction & PfunctionRelations;
