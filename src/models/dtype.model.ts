import {Entity, model, property} from '@loopback/repository';
import {DtypeData} from './dtype-data.model';
import {Metadata} from './metadata.model';

@model()
export class Dtype extends Entity {
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
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'uuid',
    },
  })
  pclassid: string;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "json",
    },
  })
  data: DtypeData;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  timestamp: string;

  @property({
    type: 'object',
    required: true,
    default: {},
    postgresql: {
      dataType: "jsonb",
    },
  })
  metadata: Metadata;

  constructor(data?: Partial<Dtype>) {
    super(data);
  }
}

export interface DtypeRelations {
  // describe navigational properties here
}

export type DtypeWithRelations = Dtype & DtypeRelations;
