import {Entity, Model, model, property} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {FilePointer} from './file-pointer.model';
import {GapiFunction} from './gapi.model';

@model()
export class PgraphData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  onchainid: number;

  @property({
    type: 'number',
  })
  chainid: number;

  @property({
    type: 'string',
  })
  interpreter: string;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "json",
    },
  })
  shortPgraph: object;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "json",
    },
  })
  runnablePgraph: object;

  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
  })
  onchainPgraph?: object;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "jsonb",
    },
  })
  gapi: GapiFunction;

  @property({
    type: 'string',
    required: true,
  })
  markdown: string;

  // SourceLanguage ?
  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
  })
  filePointer: FilePointer;

  constructor(data?: Partial<PgraphData>) {
    super(data);
  }
}


@model()
export class Pgraph extends Entity {
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
    type: 'object',
    required: true,
    default: {},
    postgresql: {
      dataType: "json",
    },
  })
  data: PgraphData;

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
    type: 'date',
    default: new Date(),
  })
  timestamp: string;

  constructor(data?: Partial<Pgraph>) {
    super(data);
  }
}

export interface PgraphRelations {
  // describe navigational properties here
}

export type PgraphWithRelations = Pgraph & PgraphRelations;
