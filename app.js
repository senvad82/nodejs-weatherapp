
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a:{
      demand:true,
      describe:'Address to fetch weather',
      alias:'address',
      string:true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

   geocode.asyncGeoCode(argv.address).then((coord) => {
     if(coord){
       console.log(coord);
          weather.asyncGetWeather(coord.lat, coord.long).then((weather)=>{
              console.log(`Weather:${weather.temp}`);
          },(message)=>{
            console.log(message);
          })
     }
    }
    ,(message)=>{
      console.log(message);
    });

  ;
