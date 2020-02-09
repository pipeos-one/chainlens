import {Entity, Model, model, property} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {FilePointer} from './file-pointer.model';

@model()
export class Package extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  data: PackageData;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  metadata: Metadata;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  timestamp: string;


  constructor(data?: Partial<Package>) {
    super(data);
  }
}

export interface PackageRelations {
  // describe navigational properties here
}

export type PackageWithRelations = Package & PackageRelations;


@model()
export class PackageData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'object',
    required: true,
  })
  packageJson: object;

  @property({
    type: 'object',
    required: true,
  })
  filePointer: FilePointer;

  constructor(data?: Partial<Package>) {
    super(data);
  }
}
