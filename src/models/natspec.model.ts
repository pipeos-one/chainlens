import {Model, model, property} from '@loopback/repository';

@model()
export class DocParams extends Model {
  [prop: string]: any;

  constructor(data?: Partial<DocParams>) {
    super(data);
  }
}

@model()
export class NatspecMethod extends Model {
  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
  })
  params: DocParams;

  @property({
    type: 'string',
  })
  return?: string;

  @property({
    type: 'string',
  })
  details?: string;

  @property({
    type: 'string',
  })
  notice?: string;

  constructor(data?: Partial<NatspecMethod>) {
    super(data);
  }
}

// TODO: fix number -> string
@model()
export class NatspecMethods extends Model {
  [prop: number]: NatspecMethod;

  constructor(data?: Partial<NatspecMethods>) {
    super(data);
  }
}

@model()
export class Natspec extends Model {
  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  author?: string;

  @property({
    type: 'string',
  })
  notice?: string;

  @property({
    type: 'string',
  })
  dev?: string;

  @property({
    type: 'object',
    default: {},
    postgresql: {
      dataType: "json",
    },
  })
  methods: NatspecMethods;

  constructor(data?: Partial<Natspec>) {
    super(data);
  }
}

export interface NatspecRelations {
  // describe navigational properties here
}

export type NatspecWithRelations = Natspec & NatspecRelations;
