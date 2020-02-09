import {Model, model, property} from '@loopback/repository';
import {FilePointer} from './file-pointer.model';
import {Compiler, CompilerOutput} from './compiler.model';

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


@model()
export class SourceData extends Model {
  @property({
    type: 'array',
    itemType: 'object',
  })
  sources: Source[];

  @property({
    type: 'object',
  })
  compiler: Compiler;

  @property({
    type: 'object',
  })
  compilerOutput: CompilerOutput;

  @property({
    type: 'object',
  })
  extra: Object;

  constructor(data?: Partial<SourceData>) {
    super(data);
  }
}

export interface SourceDataRelations {
  // describe navigational properties here
}

export type SourceDataWithRelations = SourceData & SourceDataRelations;


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
    required: true,
  })
  filePointer: FilePointer;

  constructor(data?: Partial<Source>) {
    super(data);
  }
}
