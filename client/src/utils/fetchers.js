import {PIPEOS_SERVER} from '../config';
import fetch from 'unfetch';
import useSWR from "swr";

const DEFAULT_OPTIONS = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 20000,
  focusThrottleInterval: 500000,
  loadingTimeout: 5000,
  errorRetryInterval: 10000,
}

export const pclassApi = () => `${PIPEOS_SERVER.host}${PIPEOS_SERVER.route.pclass}`;

export const pfunctionApi = () => `${PIPEOS_SERVER.host}${PIPEOS_SERVER.route.pfunction}`;

export const pclassWithPfuncApi = (filter = {}, type = 'pclass') => {
  let relations = [];
  if (type === 'pclass') {
    relations = [
      {relation: 'pfunctions'},
      {relation: 'pclassInstances'},
      // TODO: this should be gotten on demand
      // {relation: 'sources', scope: {include: [{relation: 'file'}]}}
      {relation: 'sources'},
    ];
  }
  if (type === 'pfunction') {
    relations = [{
      relation: 'pclass',
      // scope: {
      //   include: [{relation: 'pclassInstances'}],
      // },
    }];
  }
  if (type === 'pclassi') {
    relations = [{
      relation: 'pclass',
      scope: {
        include: [{relation: 'pfunctions'}],
      },
    }];
  }

  filter = {...filter, include: relations};

  console.log('filter', filter, JSON.stringify(filter));
  return `${PIPEOS_SERVER.host}/${type}?filter=${JSON.stringify(filter)}`;
}

export const pclassCount = (filter = {}, type) => {
  console.log('pclassCount', filter.where, JSON.stringify(filter.where));
  return `${PIPEOS_SERVER.host}/${type}/count?where=${JSON.stringify(filter.where)}`;
}

export async function fetcher(apiUrl) {
  console.log('!! fetcher');
  const res = await fetch(apiUrl);
  return await res.json();
}

export function useSearchResults(filter, type = 'pclass') {
  return useSWR(pclassWithPfuncApi(filter, type), fetcher, DEFAULT_OPTIONS)
}

export function useSearchCount(filter, type = 'pclass') {
  return useSWR(pclassCount(filter, type), fetcher, DEFAULT_OPTIONS)
}
