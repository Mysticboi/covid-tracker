import axios from 'axios';
import apiKeyDev from '../apikey.json';

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
    'X-RapidAPI-Host': 'covid-19-tracking.p.rapidapi.com',
  };
}

export const fetchTotalCovidStatus = async (countryName: string) => {
  const options = {
    url: `https://covid-19-tracking.p.rapidapi.com/v1/${countryName}`,
    headers: apikey,
  };

  try {
    const response = await axios.request(options);
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
