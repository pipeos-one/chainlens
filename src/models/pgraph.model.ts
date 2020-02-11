import {Entity, Model, model, property} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {FilePointer} from './file-pointer.model';


@model()
export class PgraphData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

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
    type: 'string',
    required: true,
  })
  markdown: string;

  @property({
    type: 'object',
    required: true,
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
  })
  _id?: string;

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
    required: true,
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
