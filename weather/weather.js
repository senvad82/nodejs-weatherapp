const request = require('request');

var asyncGetWeather = (lat, long) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/3349aec9cf96df3f46945b2d4daa326e/${lat},${long}`,
      json: true
    }, (error, response, body) => {      
      if (!error && response.statusCode === 200) {
        var weather = {
          temp: body.currently.temperature
        };
        resolve(weather);
      } else if (response.statusCode === 400) {
        reject('could not fetch weather');
      }
      reject('could not fetch weather2');
    });
  })
};

var getWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/3349aec9cf96df3f46945b2d4daa326e/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var weather = {
        temp: body.currently.temperature
      };
      callback(undefined, weather);
    } else if (response.statusCode === 400) {
      console.log('could not fetch weather');
    }
  });
};



module.exports = {
  getWeather,
  asyncGetWeather
};
