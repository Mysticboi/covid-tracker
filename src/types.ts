export type TotalCovid = {
  name: string;
  population: number;
  tested: number;
  confirmed: number;
  recovered: number;
  deaths: number;
};

export type Option = {
  label: string;
  value: string;
};

export type ApiResponse = {
  response: [
    {
      country: string;
      population: number;
      cases: {
        total: number;
        recovered: number;
      },
      deaths: {
        total: number
      },
      tests: {
        total: number;
      },
      day: string;
      time: string;
    }
  ]
};
