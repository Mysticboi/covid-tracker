import axios, { AxiosResponse } from 'axios';
import apiKeyDev from '../apikey.json';
import { ApiResponse } from '../types';

let apikey: {
  'X-RapidAPI-Key'?: string;
  'X-RapidAPI-Host'?: string;
};

if (process.env.NODE_ENV === 'development') {
  console.log('DEV');
  apikey = apiKeyDev;
} else {
  console.log('PROD');
  apikey = {
    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
    'X-RapidAPI-Host': 'https://covid-193.p.rapidapi.com/statistics',
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
    console.log("apiResponse", response);
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
