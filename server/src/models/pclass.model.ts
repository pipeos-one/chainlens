import {Entity, Model, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {GapiFunction} from './gapi.model';
import {Natspec} from './natspec.model';
import {Pfunction} from './pfunction.model';
import {PclassInstance} from './pclass-instance.model';
import {Ppackage} from './ppackage.model';
import {LanguageSource} from './language-source.model';

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

  @hasMany(() => Pfunction, {keyTo: 'pclassid'})
  pfunctions: Pfunction[];

  @hasMany(() => PclassInstance, {keyTo: 'pclassid'})
  pclassInstances: PclassInstance[];

  @belongsTo(() => Ppackage, {name: 'ppackage'})
  ppackageid?: string;

  @hasMany(() => LanguageSource, {keyTo: 'pclassid'})
  sources: LanguageSource[];

  constructor(data?: Partial<Pclass>) {
    super(data);
  }
}

export interface PclassRelations {
  // describe navigational properties here
}

export type PclassWithRelations = Pclass & PclassRelations;
