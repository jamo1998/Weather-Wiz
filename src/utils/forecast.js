const request = require('request')

const forecast = (lat, lon, callback) => {
  const url = 'https://api.darksky.net/forecast/9a578fad074ac3aa85c15204f743f246/' + lat + ',' + lon + '?';

  request({
    url,
    json: true
  }, (error, {
    body
  }) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary +
        ' It is currently ' +
        body.currently.temperature +
        ' degrees out. There is a ' +
        body.currently.precipProbability +
        '% chance of rain')
    }
  })
}

module.exports = forecast