import { useState } from 'react';

import BasicTable from './components/BasicTable';
import { GitHub, Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import countries from './data/countries.json';
import Select from 'react-select';
import { fetchTotalCovidStatus } from './util/api';
import { isMobile } from 'react-device-detect';

import './App.css';
import safety from './assets/covid-safety-measures.jpg';

import { TotalCovid, Option } from './types';

const countriesOptions: Option[] = countries.map((countryName) => {
  return { value: countryName, label: countryName };
});

function App() {
  const [remainingRequests, setRemainingRequests] = useState(0);
  const [totalCovidCountry, setTotalCovidCountry] = useState<TotalCovid[]>([]);
  const [dateLastUpdateTotal, setDateLastUpdateTotal] = useState('');
  const [error, setError] = useState('');

  const handleSelectChange = async (option: Option | null) => {
    // option represents the select object {value: ... , label: ...}
    try {
      if (option?.value) {
        const countryName = option.value;
        const index = totalCovidCountry.findIndex(
          ({ name }) => name === countryName
        );
        if (index !== -1) {
          setError(
            `Country already selected, check number ${totalCovidCountry.length - index
            } `
          );
          return;
        }
        const response = await fetchTotalCovidStatus(countryName);
        setRemainingRequests(
          response.headers['x-ratelimit-rapid-free-plans-hard-limit-remaining']
        );
        const data = response.data;
        const countryData = data.response[0];

        const toAdd: TotalCovid = {
          name: countryName,
          population: countryData.population,
          confirmed: countryData.cases.total,
          recovered: countryData.cases.recovered,
          deaths: countryData.deaths.total,
          tested: countryData.tests.total
        };

        setTotalCovidCountry([toAdd, ...totalCovidCountry]);
        // if dateLastUpdate not already available we get it from the data
        if (!dateLastUpdateTotal) {
          setDateLastUpdateTotal(countryData.day);
        }

        if (error) {
          setError('');
        }
      }
    } catch (error) {
      setError('Only 5 requests/minute is allowed');
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
