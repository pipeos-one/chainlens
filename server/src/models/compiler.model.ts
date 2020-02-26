import {Model, model, property, hasOne} from '@loopback/repository';
import {File} from './file.model';

@model()
export class Compiler extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  version: string;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "json",
    },
  })
  settings: object;


  constructor(data?: Partial<Compiler>) {
    super(data);
  }
}


// Solidity:
// settings
// {
//   evmVersion: string
//   libraries: any
//   remappings: string Arr,
//   // for pinstance
//   optimizer: Object {
//     enabled: bool
//     runs: number
//   }
//   link_references:
//   link_values:
// }
