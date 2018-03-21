const request = require('request');

var asyncGeoCode = (addr) => {
  return new Promise((resolve, reject) => {
    var address = encodeURIComponent(addr);
    request({
      url: `https://maps.google.com/maps/api/geocode/json?address=${address}&key=AIzaSyDi51J6Efe1Wr6395DQWrtVy7UTDeK-f5o`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Error accesing api');
      } else if (body.status === 'ZERO_RESULTS') {
        resolve({
          lat: '',
          long: ''
        });
      } else if (body.status === 'OK') {
        resolve({
          lat: body.results[0].geometry.location.lat,
          long: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

var getGeoCode = (addr, callback) => {
  var address = encodeURIComponent(addr);

  request({
    url: `https://maps.google.com/maps/api/geocode/json?address=${address}&key=AIzaSyDi51J6Efe1Wr6395DQWrtVy7UTDeK-f5o`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log(error);
    } else if (body.status === 'ZERO_RESULTS') {
      console.log('Zero Results');
    } else if (body.status === 'OK') {
      callback(undefined, {
        lat: body.results[0].geometry.location.lat,
        long: body.results[0].geometry.location.lng
      });
    }

  });
};



module.exports= {
  getGeoCode,
  asyncGeoCode
}
