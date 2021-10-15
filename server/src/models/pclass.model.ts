import {Entity, Model, model, property, hasMany, belongsTo} from '@loopback/repository';
import {GapiFunction} from './gapi.model';
import {Metadata} from './metadata.model';
import {Natspec} from './natspec.model';
import {SourceByLanguage} from './sources.model';
import {PclassInstance} from './pclass-instance.model';
import {Pfunction} from './pfunction.model';
import {Ppackage} from './ppackage.model';

@model()
export class PclassData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
    default: 'None',
  })
  license?: string;

  @property({
    type: 'array',
    itemType: 'object',
    default: [],
    postgresql: {
      dataType: "jsonb",
    },
  })
  gapi: GapiFunction[];

  @property({
    type: 'object',
    default: {methods: {}},
    postgresql: {
      dataType: "json",
    },
  })
  natspec: Natspec;

  @property({
    type: 'object',
    required: true,
    default: {},
    postgresql: {
      dataType: "json",
    },
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
  })
  id?: string;

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
    postgresql: {
      dataType: "json",
    },
  })
  data: PclassData;

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
  extra: object;  // freeform; e.g. openapiid

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  timestamp: string;
  @hasMany(() => PclassInstance, {keyTo: 'pclassid'})
  pclassInstances: PclassInstance[];

  @hasMany(() => Pfunction, {keyTo: 'pclassid'})
  pfunctions: Pfunction[];

  @belongsTo(() => Ppackage, {name: 'ppackage'})
  ppackageid?: string;

  constructor(data?: Partial<Pclass>) {
    super(data);
  }
}

export interface PclassRelations {
  // describe navigational properties here
}

export type PclassWithRelations = Pclass & PclassRelations;
