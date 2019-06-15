const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { forecast } = require('./utils/forecast');
const { geocode } = require('./utils/geocode');
const app = express();

app.set('view engine', 'hbs');
app.set('x-powered-by', false);
app.set('views', path.join(__dirname + '/templates/views'));
hbs.registerPartials(path.join(__dirname + '/templates/partials'))

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home page',
    header: 'Weather'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    header: 'About us'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Support',
    header: 'Help',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit sapiente, aliquam repellendus obcaecati commodi error aliquid eius iste vero ipsum repellat laudantium sequi asperiores debitis ipsa, nemo eaque, quis fugiat.'
  });
});

app.get('/weather', (req, res) => {
  let { location } = req.query;
  if(!location) {
    location = 'los angeles'
  }
  geocode(location, (err, { locationName, latitude, longtitude } = {}) => {
    if(err) { 
      res.send({err});
    } else {
      forecast(latitude, longtitude, (err, data) => {
        if(err) {
          res.send({err});
        } else {
          res.send({
            forecast: data,
            location: locationName
          });
        }
      });
    }
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404 Not found',
    header: '404',
    message: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404 Not found',
    header: '404',
    message: 'Page not found'
  });
});

app.listen(3000, () => console.log('Server is listening on port 3000'));