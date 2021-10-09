import {Model, model, property} from '@loopback/repository';
// import {DtypeComponent} from './dtype-component.model';

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
  identifier: string;  // type_id

  @property({
    type: 'string',
    // required: true,
  })
  abstractIdentifier: string;  // abstract type id

  // @property({
  //   type: 'array',
  //   itemType: 'object',
  //   // required: true,
  //   default: [],
  //   postgresql: {
  //     dataType: "jsonb",
  //   },
  // })
  // steps: dTypeStep[];

  // entire insert input
  @property({
    type: 'string',
    required: true,
  })
  input: string; // hex inputs

  // instantiation json
  // abi format with needed arguments
  @property({
    type: 'object',
    required: true,
  })
  inputArgs: object; // hex inputs

  @property({
    type: 'array',
    itemType: 'string',
    // required: true,
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
