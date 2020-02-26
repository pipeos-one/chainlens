import {Model, model, property} from '@loopback/repository';


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

  type: 'url';

  constructor(data?: Partial<FilePointer>) {
    super(data);
  }
}

export type FilePointer = SwarmPointer | IpfsPointer | UriPointer;
