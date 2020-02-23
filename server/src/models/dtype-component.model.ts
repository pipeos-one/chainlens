import {Model, model, property} from '@loopback/repository';

@model()
export class DtypeComponent extends Model {
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


  constructor(data?: Partial<DtypeComponent>) {
    super(data);
  }
}

export interface DtypeComponentRelations {
  // describe navigational properties here
}

export type DtypeComponentWithRelations = DtypeComponent & DtypeComponentRelations;
