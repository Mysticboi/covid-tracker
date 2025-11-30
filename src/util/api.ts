import axios, { AxiosResponse } from 'axios';
import apiKeyDev from '../apikey.json';
import { ApiResponse } from '../types';

let apikey: {
  'x-rapidapi-key'?: string;
  'x-rapidapi-host'?: string;
};

if (process.env.NODE_ENV === 'development') {
  console.log('DEV');
  apikey = apiKeyDev;
} else {
  console.log('PROD');
  apikey = {
    'x-rapidapi-key': process.env.REACT_APP_KEY,
    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
  };
}

export const fetchTotalCovidStatus = async (
  countryName: string
): Promise<AxiosResponse<ApiResponse>> => {
  const options = {
    url: `https://covid-193.p.rapidapi.com/statistics`,
    headers: apikey,
    params: {
      country: countryName != "World" ? countryName : "all"
    }
  };

  try {
    const response: AxiosResponse<ApiResponse> = await axios.request(options);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
/* // Testing 
const testFetch = async () => {
  try {
    const testResponse = await fetchTotalCovidStatus('france');
    console.log('Testresponse', testResponse);
  } catch (error) {
    console.error(error);
  }
};

testFetch();
*/
