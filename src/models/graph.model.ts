import {Entity, Model, model, property} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {FilePointer} from './file-pointer.model';


@model()
export class GraphData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'object',
    required: true,
  })
  shortGraph: object;

  @property({
    type: 'object',
    required: true,
  })
  runnableGraph: object;

  @property({
    type: 'string',
    required: true,
  })
  markdown: string;

  @property({
    type: 'object',
    required: true,
  })
  filePointer: FilePointer;


  constructor(data?: Partial<GraphData>) {
    super(data);
  }
}


@model()
export class Graph extends Entity {
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
  })
  data: GraphData;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  metadata: Metadata;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  timestamp: string;


  constructor(data?: Partial<Graph>) {
    super(data);
  }
}

export interface GraphRelations {
  // describe navigational properties here
}

export type GraphWithRelations = Graph & GraphRelations;
