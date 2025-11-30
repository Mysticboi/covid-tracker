# Covid Country Tracker

Simple web page where you can select a country (typing works too) and it wall call an API to get the current total covid stats ( confirmed- recovered-critical- deaths)

Live Demo [Here](https://covid-tracker-v2-26vbhilvm-mysticboi.vercel.app/)

API used: [Covid-19-data](https://rapidapi.com/api-sports/api/covid-193)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## API Config:

Create a file apikey.json in the src folder with this form:

`{ "x-rapidapi-key": "xxxxxxxxxxxxxxxxxxxxxxxxxxx", "x-rapidapi-host": "xxxxxxxxxxxxxxxxxxxxxx" }`

You can get the key and host from the API website by creating an account and subscribing to the free plan.

## Available Scripts

In the project directory, you can run:

### `yarn install`

To install all dependencies (first thing to do)

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
