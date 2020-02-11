import {Model, model, property} from '@loopback/repository';
import {StateMutability, SolType} from '../interfaces';

@model()
export class AbiExtra extends Model {
  [key: string]: any;

  constructor(data?: Partial<AbiExtra>) {
    super(data);
  }
}

@model()
export class AbiFunctionIO extends Model {
  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'string',
  })
  type: SolType;

  @property({
    type: 'array',
    itemType: 'object',
    postgresql: {
      dataType: "jsonb",
    },
  })
  components: AbiFunctionIO[];

  @property({
    type: 'object',
    postgresql: {
      dataType: "jsonb",
    },
  })
  extra?: AbiExtra;

  constructor(data?: Partial<AbiFunctionIO>) {
    super(data);
  }
}

@model()
export class AbiFunctionInput extends AbiFunctionIO {
  @property({
    type: 'boolean',
  })
  indexed?: boolean;

  constructor(data?: Partial<AbiFunctionInput>) {
    super(data);
  }
}

@model()
export class AbiFunctionOutput extends AbiFunctionIO {}

@model()
export class GapiFunction extends Model {
  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'string',
  })
  type: string;

  @property({
    type: 'string',
  })
  stateMutability: StateMutability;

  @property({
    type: 'boolean',
  })
  constant?: boolean;

  @property({
    type: 'boolean',
  })
  payable?: boolean;

  @property({
    type: 'boolean',
  })
  anonymous?: boolean;

  @property({
    type: 'array',
    itemType: 'object',
    postgresql: {
      dataType: "jsonb",
    },
  })
  inputs: AbiFunctionInput[];

  @property({
    type: 'array',
    itemType: 'object',
    postgresql: {
      dataType: "jsonb",
    },
  })
  outputs: AbiFunctionOutput[];

  @property({
    type: 'object',
    postgresql: {
      dataType: "jsonb",
    },
  })
  extra?: object;

  constructor(data?: Partial<GapiFunction>) {
    super(data);
  }
}

export interface GapiFunctionRelations {
  // describe navigational properties here
}

export type GapiFunctionWithRelations = GapiFunction & GapiFunctionRelations;
