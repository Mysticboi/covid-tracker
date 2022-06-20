const axios = require('axios');
const fs = require('fs');

const apikey = require('./apikey.json');

const options = {
  method: 'GET',
  url: 'https://covid-19-tracking.p.rapidapi.com/v1',
  headers: apikey,
};

axios.request(options).then((response) => {
  console.log('response', response.data);
  const data = response.data.map(({ Country_text }) => Country_text);
  const jsonData = JSON.stringify(data);
  fs.writeFileSync('./data/country.json', jsonData);
});
