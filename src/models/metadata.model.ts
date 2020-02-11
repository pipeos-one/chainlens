import {Model, model, property} from '@loopback/repository';

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
    itemType: 'number',
    required: true,
    default: [],
    postgresql: {
      dataType: "jsonb",
    },
  })
  chainids: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
    default: [],
    postgresql: {
      dataType: "jsonb",
    },
  })
  languages: number[];

  constructor(data?: Partial<Metadata>) {
    super(data);
  }
}

export interface MetadataRelations {
  // describe navigational properties here
}

export type MetadataWithRelations = Metadata & MetadataRelations;
