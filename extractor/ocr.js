const Tesseract = require('tesseract.js');

Tesseract.recognize('./image.png')
    .then(function (result) {
        console.log(result.data.text);
    });