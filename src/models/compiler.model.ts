import {Model, model, property} from '@loopback/repository';

@model()
export class Bytecode extends Model {
    @property({
      type: 'string',
    })
    bytecode: string;  // 0x...

    @property({
      type: 'object',
      default: {},
      postgresql: {
        dataType: "json",
      },
    })
    extra: Object;
}

// Solidity extra
// Link References, link values

@model()
export class CompilerOutput extends Model {
  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "json",
    },
  })
  runtime?: Bytecode;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "json",
    },
  })
  compiled: Bytecode;

  constructor(data?: Partial<CompilerOutput>) {
    super(data);
  }
}

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
// }
