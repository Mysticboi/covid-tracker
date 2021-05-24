import axios from 'axios';

export const fetchLatestCovidStatus = async (countryName) => {
  const options = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/country',
    params: { name: countryName },
    headers: {
      'x-rapidapi-key': '99d1a6e627mshba8f7443194897cp1f0fa6jsne0cfe850257e',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

/*const testFetch = async () => {
  try {
    const testResponse = await fetchLatestCovidStatus('france');
    console.log('Testresponse', testResponse);
  } catch (error) {
    console.error(error);
  }
};

testFetch();
*/
