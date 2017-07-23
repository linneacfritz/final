var libretext = '/home/linnea/data_processing/outputLibre.txt'
const fs = require('fs');
allA();

function allA(){

    for (var i = 0; i<5883; i++){
        fs.appendFileSync(libretext, ('\n=A'+i+'-B'+i));
      }
  }
