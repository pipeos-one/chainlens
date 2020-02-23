import {Model, model, property} from '@loopback/repository';
import {DtypeComponent} from './dtype-component.model';

@model()
export class DtypeData extends Model {
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
    postgresql: {
      dataType: "jsonb",
    },
  })
  inputs: DtypeComponent[];

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
    default: [],
    postgresql: {
      dataType: "jsonb",
    },
  })
  optionals: DtypeComponent[];

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
    default: [],
    postgresql: {
      dataType: "jsonb",
    },
  })
  outputs: DtypeComponent[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    default: [],
  })
  synsets: string[];  // bytes32[]

  constructor(data?: Partial<DtypeData>) {
    super(data);
  }
}

export interface DtypeDataRelations {
  // describe navigational properties here
}

export type DtypeDataWithRelations = DtypeData & DtypeDataRelations;
