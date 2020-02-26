import {Entity, model, property, hasOne} from '@loopback/repository';
import {File} from './file.model';
import {Compiler} from './compiler.model';
import {Languages} from '../interfaces/chainlens';

@model()
export class LanguageSource extends Entity {
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
      dataType: 'uuid',
    },
  })
  pclassid?: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'uuid',
    },
  })
  dtypeid?: string;

  @property({
    type: 'string',
    required: true,
  })
  language: Languages;

  @property({
    type: 'string',
    required: true,
  })
  sourcehash: string;

  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
  })
  compiler?: Compiler;

  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
  })
  extra?: Object;

  // If multiple files, this should be a folder
  @hasOne(() => File, {keyTo: 'sourceid'})
  file: File;

  constructor(data?: Partial<LanguageSource>) {
    super(data);
  }
}

export interface LanguageSourceRelations {
  // describe navigational properties here
}

export type LanguageSourceWithRelations = LanguageSource & LanguageSourceRelations;
