// import { ethers } from 'ethers';
import { dtypeApi } from './fetchers.js';

export const uencode = (value, size) => value.toString(16).padStart(size, '0');

export const encodeTypeData = async (type, value) => {
  console.log('encodeTypeData', type, value);
  const abstractType = type.substring(0, 2);
  console.log('abstractType', abstractType);
  const size = parseInt('0x' + type.substring(2));
  console.log('size', size);
  switch(abstractType) {
    case '44':
      return type.substring(0, 8) + uencode(type.substring(8), value)
    case 'ee':
      break;
    case '11':
      return type + uencode(value, size*2);
    case '22':
      return type + uencode(value, size*2);
    default:
      const actualType = await getAbstractType(type);
      if (!actualType || actualType.length === 0) return null;
      return await encodeTypeData(actualType[0].data.abstractIdentifier, value);
      // const encoded = await encodeTypeData(actualType[0].data.abstractIdentifier, value);
      // return type + encoded.substring(8);
  }
}

export const getAbstractType = async type => {
  const filter = {where: {'data.identifier': type}}
  const resp = await fetch(dtypeApi + '?filter=' + JSON.stringify(filter))
  return await resp.json();
}
