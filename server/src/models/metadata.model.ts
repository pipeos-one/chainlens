import {Model, model, property} from '@loopback/repository';
import {Languages} from '../interfaces/chainlens';

@model()
export class Metadata extends Model {
  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    default: [],
    postgresql: {
      dataType: "jsonb",
    },
  })
  categories: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    default: [],
    postgresql: {
      dataType: "jsonb",
    },
  })
  synsets: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    default: [],
    postgresql: {
      dataType: "jsonb",
    },
  })
  chainids: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    default: [],
    postgresql: {
      dataType: "jsonb",
    },
  })
  languages: Languages[];

  constructor(data?: Partial<Metadata>) {
    super(data);
  }
}

export interface MetadataRelations {
  // describe navigational properties here
}

export type MetadataWithRelations = Metadata & MetadataRelations;
