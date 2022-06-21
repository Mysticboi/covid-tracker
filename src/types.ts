export type TotalCovid = {
  name: string;
  confirmed: string;
  recovered: string;
  deaths: string;
};

export type Option = {
  label: string;
  value: string;
};

export type ApiResponse = {
  'Active Cases_text': string;
  Country_text: string;
  'Last Update': string;
  'New Cases_text': string;
  'New Deaths_text': string;
  'Total Cases_text': string;
  'Total Deaths_text': string;
  'Total Recovered_text': string;
};
