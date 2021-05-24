import { useState } from 'react';
import axios from 'axios';

import BasicTable from './components/BasicTable';

import countries from './data/countries.json';
import Select from 'react-select';

const countriesOptions = countries.map((item) => {
  const name = item.name;
  return { value: name, label: name };
});

const fetchLatestCovidStatus = async (countryName) => {
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

function App() {
  // const [selectedCountry, setSelectedCountry] = useState('');
  const [remainingRequests, setRemainingRequests] = useState(0);
  const [latestCovidCountry, setLatestCovidCountry] = useState([]);
  const [dateLastUpdateTotal, setDateLastUpdateTotal] = useState('');
  const [error, setError] = useState('');

  const handleSelectChange = async (e) => {
    // e represents the select object {value: ... , label: ...}
    console.log(e);
    // setSelectedCountry(e.value);
    try {
      const response = await fetchLatestCovidStatus(e.value);
      setRemainingRequests(response.headers['x-ratelimit-requests-remaining']);
      const data = response.data[0];
      if (data.confirmed + data.recovered + data.critical + data.deaths === 0) {
        setError(`No data available for ${data.country}`);
        return;
      }
      console.log('changeResponse', response.data[0]);
      setLatestCovidCountry([...latestCovidCountry, data]);
      setDateLastUpdateTotal(data.lastUpdate.split('T')[0]);
      error && setError('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Covid Country Tracker</h1>
      <h3>Select a country just below</h3>
      <Select options={countriesOptions} onChange={handleSelectChange} />
      <br />
      <h3 style={{ color: 'red', fontStyle: 'italic' }}>{error}</h3>
      {latestCovidCountry.length !== 0 && (
        <h3>
          Current total covid stats (Last updated on {dateLastUpdateTotal})
        </h3>
      )}
      <BasicTable latestCovidCountries={latestCovidCountry} />

      {remainingRequests !== 0 && (
        <p>
          Number of API requests remaining for this month: {remainingRequests}
        </p>
      )}
      {remainingRequests === 0 && (
        <p>Choose a country to get the number of API requests remaining</p>
      )}
    </div>
  );
}

export default App;
