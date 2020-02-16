import fetch from 'unfetch';
import useSWR from 'swr';
import {pclassWithPfuncApi} from './utils.js';

export async function fetcher(apiUrl) {
  const res = await fetch(apiUrl);
  return await res.json();
}

export function useSearchResults(filter) {
  return useSWR(pclassWithPfuncApi(filter), fetcher)
}
