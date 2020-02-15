import {PIPEOS_SERVER} from './config';

export const pclassApi = () => `${PIPEOS_SERVER.host}${PIPEOS_SERVER.route.pclass}`;

export const pclassWithPfuncApi = (filter = {}) => {
  filter = {...filter, include: [{relation: 'pfunctions'}]};
  return `${pclassApi()}?filter=${JSON.stringify(filter)}`;
}
