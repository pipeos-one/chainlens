import {Entity, Model, model, property} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {FilePointer} from './file-pointer.model';


@model()
export class PpackageData extends Model {
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

  constructor(data?: Partial<Ppackage>) {
    super(data);
  }
}


@model()
export class Ppackage extends Entity {
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
  data: PpackageData;

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


  constructor(data?: Partial<Ppackage>) {
    super(data);
  }
}

export interface PpackageRelations {
  // describe navigational properties here
}

export type PpackageWithRelations = Ppackage & PpackageRelations;
