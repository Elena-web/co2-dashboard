export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
  cumulative_cement_co2?: number;
  temperature_change_from_co2?: number;
  [key: string]: number | undefined;
}

export interface CountryData {
  iso_code?: string;
  country?: string;
  region?: string;
  data: YearlyData[];
}

export type CO2Data = Record<string, CountryData>;
