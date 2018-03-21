const yargs = require('yargs');
const axios = require('axios');
const addr = require('./address');

const argv = yargs
  .options({
    a: {
      //demand: true,
      describe: 'Address to fetch weather',
      alias: 'address',
      string: true
    },
    d: {
      describe: 'default address to fetch weather',
      alias: 'daddress',
      string: true
    },

  })
  .help()
  .alias('help', 'h')
  .argv;

var address = argv.address;

if (argv.daddress) {
  addr.saveAddress(argv.daddress).then((message) => {
    console.log(message);
  });
}

addr.fetchAddress(address).then((add) => {
  console.log(add);
  var daddress = encodeURIComponent(add);
  var geoUrl = `https://maps.google.com/maps/api/geocode/json?address=${address}&key=AIzaSyDi51J6Efe1Wr6395DQWrtVy7UTDeK-f5o`;
  return axios.get(geoUrl);
}).then((response) => {
  var lat = response.data.results[0].geometry.location.lat;
  var long = response.data.results[0].geometry.location.lng;
  console.log(`lat: ${lat} & lng: ${long}`);
  var weatherUrl = `https://api.darksky.net/forecast/3349aec9cf96df3f46945b2d4daa326e/${lat},${long}`;
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemp = response.data.currently.apparatemperature;
  console.log(`temperature:${temperature}`);
}).catch((e) => {
  console.log(e);
});
