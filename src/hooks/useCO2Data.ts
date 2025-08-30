import type { CO2Data } from '../types/co2';

function fetchData(): Promise<CO2Data> {
  return fetch('/owid-co2-data.json').then((res) => res.json());
}

let data: CO2Data | null = null;
let promise: Promise<CO2Data> | null = null;

export function useCO2Data(): CO2Data {
  if (data) return data;
  if (!promise) {
    promise = fetchData().then((res) => {
      data = res;
      return res;
    });
  }
  throw promise;
}
