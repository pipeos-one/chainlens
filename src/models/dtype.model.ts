import {Entity, model, property} from '@loopback/repository';
import {DtypeData} from './dtype-data.model';
import {Metadata} from './metadata.model';

@model({settings: {strict: false}})
export class Dtype extends Entity {
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
  pclassid: String;

  @property({
    type: 'object',
    required: true,
  })
  data: DtypeData;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  timestamp: string;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  metadata: Metadata;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Dtype>) {
    super(data);
  }
}

export interface DtypeRelations {
  // describe navigational properties here
}

export type DtypeWithRelations = Dtype & DtypeRelations;
