import {PIPEOS_SERVER} from './config';
import fetch from 'unfetch';
import useSWR from 'swr';

const DEFAULT_OPTIONS = {
  revalidateOnFocus: false,
  dedupingInterval: 20000,
  focusThrottleInterval: 50000,
}

export const pclassApi = () => `${PIPEOS_SERVER.host}${PIPEOS_SERVER.route.pclass}`;

export const pclassWithPfuncApi = (filter = {}) => {
  filter = {...filter, include: [{relation: 'pfunctions'}]};

  console.log('filter', filter, JSON.stringify(filter));
  return `${pclassApi()}?filter=${JSON.stringify(filter)}`;
}

export const pclassCount = (filter = {}) => {
  console.log('pclassCount', filter.where, JSON.stringify(filter.where));
  return `${pclassApi()}/count?where=${JSON.stringify(filter.where)}`;
}

export async function fetcher(apiUrl) {
  console.log('!! fetcher');
  const res = await fetch(apiUrl);
  return await res.json();
}

export function useSearchResults(filter) {
  return useSWR(pclassWithPfuncApi(filter), fetcher, DEFAULT_OPTIONS)
}

export function useSearchCount(filter) {
  return useSWR(pclassCount(filter), fetcher, DEFAULT_OPTIONS)
}
