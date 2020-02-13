import {GapiFunction, AbiFunctionInput} from '../models';

export function getSignature(fgapi: GapiFunction) {
  let signature: string = '';
  if (fgapi.inputs) {
      signature = `(${fgapi.inputs.map((input: AbiFunctionInput) => input.type).join(',')})`;
  }
  signature = fgapi.name ? `${fgapi.name}${signature}` : signature;
  return signature;
}
