import {Entity, Model, model, property, belongsTo} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {SourceByLanguage} from './sources.model';
import {AbiFunction} from '../interfaces/gapi';
import {Natspec} from '../interfaces/natspec';
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
  signature: string;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "jsonb",
    },
  })
  gapi: AbiFunction;

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
    required: true,
    generated: true,
  })
  _id: string;
  @property({
    type: 'string',
    required: true,
  })
  dtypeid: string;

  @property({
    type: 'string',
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
