const request = require('request');

exports.forecast = (latitude, longtitude, cb) => {
  const url = `https://api.darksky.net/forecast/e2a8a9a9ea0dac7477ae69ce125103da/${latitude},${longtitude}?units=si`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      cb('Unable to connect to weather services');
    } else if (res.body.error) {
      cb(res.body.error);
    } else {
      const { temperature, precipProbability, humidity } = res.body.currently;
      cb(undefined, `It's currently ${temperature} degrees out. There is ${precipProbability*100}% chance of rain. Humidity ${humidity*100}%`);
    }
  });
}