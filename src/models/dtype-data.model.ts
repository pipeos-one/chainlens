import {Model, model, property} from '@loopback/repository';
import {DTypeComponent} from './dtype-component.model';

@model()
export class DTypeData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  identifier: string;  // encoded name

  @property({
    type: 'number',
    required: true,
  })
  typeChoice: number;

  @property({
    type: 'boolean',
    required: true,
  })
  hasSlotSize: boolean;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
    default: [],
  })
  inputs: DTypeComponent[];

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
    default: [],
  })
  optionals: DTypeComponent[];

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
    default: [],
  })
  outputs: DTypeComponent[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    default: [],
  })
  synsets: string[];  // bytes32[]

  constructor(data?: Partial<DTypeData>) {
    super(data);
  }
}

export interface DTypeDataRelations {
  // describe navigational properties here
}

export type DTypeDataWithRelations = DTypeData & DTypeDataRelations;
