import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {FilePointer} from './file-pointer.model';
import {LanguageSource} from './language-source.model';

@model()
export class File extends Entity {
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
    postgresql: {
      dataType: "uuid",
    },
  })
  parentid?: string;
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  extension: string;

  @property({
    type: 'string',
    required: true,
  })
  encoding: string;

  @property({
    type: 'string',
    required: true,
  })
  mimetype: string;

  @property({
    type: 'number',
    required: true,
  })
  size: number;

  @property({
    type: 'buffer',
    required: true,
    postgresql: {
      dataType: "bytea",
    },
  })
  source: Buffer;

  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
  })
  pointer?: FilePointer;

  @property({
    type: 'string',
  })
  relative_path?: string;

  @hasMany(() => File, {keyTo: '_id'})
  subfiles: File[];

  @belongsTo(() => LanguageSource, {name: 'source'})
  sourceid?: string;

  constructor(data?: Partial<File>) {
    super(data);
  }
}

export interface FileRelations {
  // describe navigational properties here
}

export type FileWithRelations = File & FileRelations;
