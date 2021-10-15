import {Entity, model, property} from '@loopback/repository';

// TODO: same data. model
@model()
export class TypeInstance extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    useDefaultIdType: false,
    postgresql: {
      dataType: 'uuid',
      extension: 'pgcrypto',
      defaultFn: 'gen_random_uuid()',
    },
  })
  _id: string;

  @property({
    type: 'number',
    required: true,
  })
  index: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'uuid',
    },
  })
  dtype_id: string;

  @property({
    type: 'string',
    required: true,
  })
  dtype_identifier: string;  // 11000003

  @property({
    type: 'string',
  })
  dtype_name?: string;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  @property({
    type: 'string',
    required: true,
  })
  valueHex: string;


  constructor(data?: Partial<TypeInstance>) {
    super(data);
  }
}

export interface TypeInstanceRelations {
  // describe navigational properties here
}

export type TypeInstanceWithRelations = TypeInstance & TypeInstanceRelations;
