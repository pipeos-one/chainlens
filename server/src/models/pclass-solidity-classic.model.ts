import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PclassSolidityClassic extends Model {
  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'number',
    required: true,
  })
  chainid: number;

  @property({
    type: 'string',
    required: true,
  })
  contractName: string;

  @property({
    type: 'string',
  })
  compilerVersion: string;

  @property({
    type: 'number',
    default: 0,
  })
  optimizations: number;

  @property({
    type: 'number',
    default: 0,
  })
  runs: number;

  @property({
    type: 'string',
    default: '',
  })
  evmVersion: string;

  @property({
    type: 'string',
  })
  sourceCode?: string;

  @property({
    type: 'string',
    required: true,
  })
  bytecode: string;

  @property({
    type: 'string',
    required: false,
  })
  constructorArguments?: string;

  @property({
    type: 'string',
    default: "[]",
  })
  libraries: string;

  @property({
    type: 'string',
    required: true,
  })
  abi: string;

  @property({
    type: 'number',
    required: true,
  })
  block: number;

  @property({
    type: 'string',
    required: true,
  })
  txhash: string;

  @property({
    type: 'string',
    required: false,
    default: '',
  })
  sourcemap: string;

  @property({
    type: 'string',
  })
  swarm?: string;

  @property({
    type: 'string',
    required: false,
    default: 'None',
  })
  license?: string;

  @property({
    type: 'string',
  })
  sourceCodeJson?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PclassSolidityClassic>) {
    super(data);
  }
}

export interface PclassSolidityClassicRelations {
  // describe navigational properties here
}

export type PclassSolidityClassicWithRelations = PclassSolidityClassic & PclassSolidityClassicRelations;
