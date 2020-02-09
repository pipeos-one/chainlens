import {Entity, Model, model, property} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {FilePointer} from './file-pointer.model';


@model()
export class PPackageData extends Model {
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

  constructor(data?: Partial<PPackage>) {
    super(data);
  }
}


@model()
export class PPackage extends Entity {
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
  data: PPackageData;

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


  constructor(data?: Partial<PPackage>) {
    super(data);
  }
}

export interface PPackageRelations {
  // describe navigational properties here
}

export type PPackageWithRelations = PPackage & PPackageRelations;
