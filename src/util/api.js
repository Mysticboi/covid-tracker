import axios from 'axios';
import apikey from './apikey.json';

export const fetchTotalCovidStatus = async (countryName) => {
  const options = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/country',
    params: { name: countryName },
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
