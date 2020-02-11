import {Entity, Model, model, property, hasMany} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {FilePointer} from './file-pointer.model';
import {Pclass} from './pclass.model';

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
    postgresql: {
      dataType: "json",
    },
  })
  packageJson: object;

  @property({
    type: 'object',
    required: true,
    postgresql: {
      dataType: "json",
    },
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
    postgresql: {
      dataType: "json",
    },
  })
  data: PpackageData;

  @property({
    type: 'object',
    required: true,
    default: {},
    postgresql: {
      dataType: "jsonb",
    },
  })
  metadata: Metadata;

  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  timestamp: string;

  @hasMany(() => Pclass, {keyTo: 'ppackageid'})
  pclasses: Pclass[];

  constructor(data?: Partial<Ppackage>) {
    super(data);
  }
}

export interface PpackageRelations {
  // describe navigational properties here
}

export type PpackageWithRelations = Ppackage & PpackageRelations;
