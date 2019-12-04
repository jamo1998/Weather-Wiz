const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jameson Aardalen'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jameson Aardalen'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpMsg: 'This page will show you how to navigate through the weather app',
    name: 'Jameson Aardalen'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  } else {
    geocode(req.query.address, (error, {
      latitude,
      longitude,
      location
      // Setup an empty object to destructure 
      // the object passed into geocode() to avoid
      // error when user does not provide an address
    } = {}) => {
      if (error) {
        return res.send({
          error
        })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          })
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      })
    })
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404!',
    errMsg: 'Help article not found',
    name: 'Jameson Aardalen'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404!',
    errMsg: "We're sorry! This page could not be found",
    name: 'Jameson Aardalen'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});