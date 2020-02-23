import {GapiFunction, AbiFunctionInput} from '../models';
const Web3EthAbi = require('web3-eth-abi');

export function getSignatureString(fgapi: GapiFunction) {
  const inputTypes = (fgapi.inputs || []).map((input: AbiFunctionInput) => input.type);
  return `${fgapi.name || ''}(${inputTypes.join(',')})`;
}

export function getSignature(fgapi: GapiFunction) {
  return Web3EthAbi.encodeFunctionSignature(getSignatureString(fgapi));
}
