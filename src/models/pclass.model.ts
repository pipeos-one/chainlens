import {Entity, Model, model, property, hasMany} from '@loopback/repository';
import {SourceByLanguage} from './sources.model';
import {Metadata} from './metadata.model';
import {AbiFunction} from '../interfaces/gapi';
import {Natspec} from '../interfaces/natspec';
import {Pfunction} from './pfunction.model';
import {PclassInstance} from './pclass-instance.model';

@model()
export class PclassData extends Model {
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

  constructor(data?: Partial<PclassData>) {
    super(data);
  }
}


@model()
export class Pclass extends Entity {
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
  data: PclassData;

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

  @hasMany(() => Pfunction, {keyTo: 'pclassid'})
  pfunctions: Pfunction[];

  @hasMany(() => PclassInstance, {keyTo: 'pclassid'})
  pclassInstances: PclassInstance[];

  constructor(data?: Partial<Pclass>) {
    super(data);
  }
}

export interface PclassRelations {
  // describe navigational properties here
}

export type PclassWithRelations = Pclass & PclassRelations;
