import {Model, model, property} from '@loopback/repository';
import {FilePointer} from './file-pointer.model';
import {Compiler, CompilerOutput} from './compiler.model';


@model()
export class Source extends Model {
  @property({
    type: 'string',
    required: true,
  })
  relative_path: string;

  @property({
    type: 'string',
    required: true,
  })
  source: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {
      dataType: "json",
    },
  })
  filePointer?: FilePointer;

  constructor(data?: Partial<Source>) {
    super(data);
  }
}


@model()
export class SourceData extends Model {
  @property({
    type: 'array',
    itemType: 'object',
    default: [],
    postgresql: {
      dataType: "json",
    },
  })
  sources: Source[];

  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
  })
  compiler: Compiler;

  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
  })
  compilerOutput: CompilerOutput;

  @property({
    type: 'object',
    postgresql: {
      dataType: "json",
    },
  })
  extra?: Object;

  constructor(data?: Partial<SourceData>) {
    super(data);
  }
}

export interface SourceDataRelations {
  // describe navigational properties here
}

export type SourceDataWithRelations = SourceData & SourceDataRelations;


@model()
export class SourceByLanguage extends Model {
  [prop: number]: SourceData;  // 0 : Source

  constructor(data?: Partial<SourceByLanguage>) {
    super(data);
  }
}

export interface SourceByLanguageRelations {
  // describe navigational properties here
}

export type SourceByLanguageWithRelations = SourceByLanguage & SourceByLanguageRelations;
