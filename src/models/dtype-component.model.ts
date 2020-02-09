import {Model, model, property} from '@loopback/repository';

@model()
export class DTypeComponent extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  label: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    default: [],
  })
  dimensions: string[];

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  relation: number;


  constructor(data?: Partial<DTypeComponent>) {
    super(data);
  }
}

export interface DTypeComponentRelations {
  // describe navigational properties here
}

export type DTypeComponentWithRelations = DTypeComponent & DTypeComponentRelations;
