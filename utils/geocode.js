const request = require("request");

exports.geocode = (location, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibG10bm9saW1pdCIsImEiOiJjanZkeGFieXIyZG93M3pvNXo2ZDg2MmpvIn0.wudrOxIrX625IcngtealGw&limit=1`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      cb("Unable to connect to location services!");
    } else if (res.body.features.length === 0) {
      cb("Location not found!");
    } else {
      const { center, place_name } = res.body.features[0];
      cb(undefined, {
        latitude: center[1],
        longtitude: center[0],
        locationName: place_name,
      });
    }
  });
};
