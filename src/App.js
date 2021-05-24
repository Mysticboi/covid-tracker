import { useState } from 'react';

import BasicTable from './components/BasicTable';

import countries from './data/countries.json';
import Select from 'react-select';
import { fetchLatestCovidStatus } from './util/api';

const countriesOptions = countries.map((item) => {
  const name = item.name;
  return { value: name, label: name };
});

function App() {
  // const [selectedCountry, setSelectedCountry] = useState('');
  const [remainingRequests, setRemainingRequests] = useState(0);
  const [latestCovidCountry, setLatestCovidCountry] = useState([]);
  const [dateLastUpdateTotal, setDateLastUpdateTotal] = useState('');
  const [error, setError] = useState('');

  const handleSelectChange = async (e) => {
    // e represents the select object {value: ... , label: ...}
    // setSelectedCountry(e.value);
    try {
      const response = await fetchLatestCovidStatus(e.value);
      setRemainingRequests(response.headers['x-ratelimit-requests-remaining']);
      const data = response.data[0];
      console.log('data', data);

      const keys = latestCovidCountry.map((item) => item.code);
      const index = keys.indexOf(data.code);
      if (index !== -1) {
        setError(`Country already selected, check row ${index + 1} `);
        return;
      }
      if (data.confirmed + data.recovered + data.critical + data.deaths === 0) {
        setError(`No data available for ${data.country}`);
        return;
      }
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
      <BasicTable rows={latestCovidCountry} />

      <button
        onClick={() => {
          setDateLastUpdateTotal('');
          setLatestCovidCountry([]);
          setError('');
        }}
      >
        Clear All
      </button>

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
