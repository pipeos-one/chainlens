import {Entity, Model, model, property} from '@loopback/repository';
import {SourceByLanguage} from './sources.model';
import {Metadata} from './metadata.model';
import {AbiFunction} from '../interfaces/gapi';
import {Natspec} from '../interfaces/natspec';


@model()
export class PClassData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  gapi: AbiFunction[];

  @property({
    type: 'object',
  })
  natspec: Natspec;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  sourceByLanguage: SourceByLanguage;

  constructor(data?: Partial<PClassData>) {
    super(data);
  }
}


@model()
export class PClass extends Entity {
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
  })
  data: PClassData;

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
  extra: object;  // freeform; e.g. openapiid

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  timestamp: string;


  constructor(data?: Partial<PClass>) {
    super(data);
  }
}

export interface PClassRelations {
  // describe navigational properties here
}

export type PClassWithRelations = PClass & PClassRelations;
