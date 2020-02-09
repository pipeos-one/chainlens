import {Entity, Model, model, property} from '@loopback/repository';
import {Metadata} from './metadata.model';
import {SourceByLanguage} from './sources.model';
import {AbiFunction} from '../interfaces/gapi';
import {Natspec} from '../interfaces/natspec';

@model()
export class PFunction extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'string',
    required: true,
  })
  pclassid: string;

  @property({
    type: 'string',
    required: true,
  })
  dtypeid: string;

  @property({
    type: 'string',
  })
  graphid?: string;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  data: PFunctionData;

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


  constructor(data?: Partial<PFunction>) {
    super(data);
  }
}

export interface PFunctionRelations {
  // describe navigational properties here
}

export type PFunctionWithRelations = PFunction & PFunctionRelations;


@model()
export class PFunctionData extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  signature: string;

  @property({
    type: 'object',
  })
  gapi: AbiFunction;

  @property({
    type: 'object',
  })
  natspec: Natspec;

  @property({
    type: 'object',
    required: true,
    default: {},
  })
  sourceByLanguage: SourceByLanguage;

  constructor(data?: Partial<PFunctionData>) {
    super(data);
  }
}
