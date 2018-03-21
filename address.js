const fs = require('fs');

var fetchAddress = (currentAddress) => {
  return new Promise((resolve, response) => {
    if (!currentAddress) {
      var savedAddress = fs.readFileSync('defaultloc.json');
      address = JSON.parse(savedAddress);
      resolve(address);
    } else {
      resolve(currentAddress);
    }
  });
};

var saveAddress = (address) => {
  return new Promise((resolve, response) => {
    fs.writeFileSync('defaultloc.json', JSON.stringify(address));
    resolve('address saved');
  });

};

module.exports= {
  fetchAddress,
  saveAddress
}
