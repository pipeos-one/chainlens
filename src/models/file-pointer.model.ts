import {Model, model, property} from '@loopback/repository';

@model()
export class FilePointer extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  extension: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  pointer: SwarmPointer | IpfsPointer | UriPointer;


  constructor(data?: Partial<FilePointer>) {
    super(data);
  }
}

export interface FilePointerRelations {
  // describe navigational properties here
}

export type FilePointerWithRelations = FilePointer & FilePointerRelations;

@model()
export class DStoragePointer extends Model {
  @property({
    type: 'string',
    required: true,
  })
  identifier: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  protocol: string;


  constructor(data?: Partial<FilePointer>) {
    super(data);
  }
}

@model()
export class SwarmPointer extends DStoragePointer {
  type: 'swarm';
}

@model()
export class IpfsPointer extends DStoragePointer {
  type: 'ipfs';
}

@model()
export class UriPointer extends Model {
  @property({
    type: 'string',
    required: true,
  })
  uri: string;

  constructor(data?: Partial<FilePointer>) {
    super(data);
  }
}
