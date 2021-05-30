import { useState } from 'react';

import BasicTable from './components/BasicTable';
import { GitHub, Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import countries from './data/countries.json';
import Select from 'react-select';
import { fetchTotalCovidStatus } from './util/api';

const countriesOptions = countries.map((item) => {
  const name = item.name;
  return { value: name, label: name };
});

function App() {
  // const [selectedCountry, setSelectedCountry] = useState('');
  const [remainingRequests, setRemainingRequests] = useState(0);
  const [totalCovidCountry, setTotalCovidCountry] = useState([]);
  const [dateLastUpdateTotal, setDateLastUpdateTotal] = useState('');
  const [error, setError] = useState('');

  const handleSelectChange = async (e) => {
    // e represents the select object {value: ... , label: ...}
    // setSelectedCountry(e.value);
    try {
      const response = await fetchTotalCovidStatus(e.value);
      setRemainingRequests(response.headers['x-ratelimit-requests-remaining']);
      const data = response.data[0];
      console.log('data', data);

      const keys = totalCovidCountry.map((item) => item.code);
      const index = keys.indexOf(data.code);
      if (index !== -1) {
        setError(`Country already selected, check row ${index + 1} `);
        return;
      }
      if (data.confirmed + data.recovered + data.critical + data.deaths === 0) {
        setError(`No data available for ${data.country}`);
        return;
      }
      setTotalCovidCountry([...totalCovidCountry, data]);
      // if dateLastUpdate not already available we get it from the data
      !dateLastUpdateTotal &&
        setDateLastUpdateTotal(
          data.lastUpdate.split('T')[0].split('-').reverse().join('-')
        );
      error && setError('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Covid Country Tracker</h1>
      <h2 style={{ textAlign: 'right' }}>
        Made by{' '}
        <a
          href="https://github.com/Mysticboi"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'gray' }}
        >
          Walid
          <span> </span>
          <GitHub color="action" />
        </a>
      </h2>
      <h3>Select a country just below</h3>
      <Select options={countriesOptions} onChange={handleSelectChange} />
      <br />
      <h3 style={{ color: 'red', fontStyle: 'italic' }}>{error}</h3>
      {totalCovidCountry.length !== 0 && (
        <h3>
          Current total covid stats (Last updated on {dateLastUpdateTotal})
        </h3>
      )}
      <BasicTable rows={totalCovidCountry} />
      <br />
      {totalCovidCountry.length !== 0 && (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<Delete />}
          onClick={() => {
            setDateLastUpdateTotal('');
            setTotalCovidCountry([]);
            setError('');
          }}
        >
          Clear All
        </Button>
      )}

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
