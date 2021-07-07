import { useState } from 'react';

import './App.css';

import BasicTable from './components/BasicTable';
import { GitHub, Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import countries from './data/countries.json';
import Select from 'react-select';
import { fetchTotalCovidStatus } from './util/api';
import { isMobile } from 'react-device-detect';

import safety from './assets/covid-safety-measures.jpg';

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
        setError(
          `Country already selected, check number ${keys.length - index} `
        );
        return;
      }
      if (data.confirmed + data.recovered + data.critical + data.deaths === 0) {
        setError(`No data available for ${data.country}`);
        return;
      }
      setTotalCovidCountry([data, ...totalCovidCountry]);
      // if dateLastUpdate not already available we get it from the data
      !dateLastUpdateTotal &&
        setDateLastUpdateTotal(
          data.lastUpdate.split('T')[0].split('-').reverse().join('-')
        );
      error && setError('');
    } catch (error) {
      setError('Only one request/second is allowed');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Covid Country Tracker</h1>

      <h2 className="author">
        View on{' '}
        <a
          href="https://github.com/Mysticboi/covid-tracker"
          target="_blank"
          rel="noreferrer"
        >
          Github
          <span> </span>
          <GitHub color="action" />
        </a>
      </h2>

      <h3>Select a country just below</h3>
      <div style={{ width: isMobile ? 300 : 500, margin: 'auto' }}>
        <Select options={countriesOptions} onChange={handleSelectChange} />
      </div>

      <h3 className="error">{error}</h3>
      {totalCovidCountry.length !== 0 && (
        <h3>
          Current total covid stats (Last updated on {dateLastUpdateTotal})
        </h3>
      )}
      {totalCovidCountry.length !== 0 && (
        <div className="table">
          <BasicTable rows={totalCovidCountry} />
        </div>
      )}
      <br />

      {totalCovidCountry.length !== 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
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
        </div>
      )}

      <div style={{ textAlign: 'right' }}>
        {remainingRequests !== 0 && (
          <p className="api">
            Number of API requests remaining: {remainingRequests}
          </p>
        )}
        {remainingRequests === 0 && (
          <p className="api">
            Choose a country to get the number of API requests remaining
          </p>
        )}
      </div>

      <div className="safetyImg">
        <img src={safety} alt="safetyMeasures"></img>
      </div>
    </div>
  );
}

export default App;
