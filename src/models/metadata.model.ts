import {Model, model, property} from '@loopback/repository';

@model()
export class Metadata extends Model {
  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    default: [],
  })
  categories: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    default: [],
  })
  synsets: object;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
    default: [],
  })
  chainids: string;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
    default: [],
  })
  languages: object;

  constructor(data?: Partial<Metadata>) {
    super(data);
  }
}

export interface MetadataRelations {
  // describe navigational properties here
}

export type MetadataWithRelations = Metadata & MetadataRelations;
