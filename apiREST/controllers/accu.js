import express from 'express';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios'
import cheerio from 'cheerio'
var accuweather = require('node-accuweather')()('HeVASZ1RAZuAji6Loywzn6RzjdpRis5W');

class AccuController {

  getInfo(req, res){

    accuweather.getCurrentConditions("Santiago", {unit: "Celsius"})
      .then(function(result) {
        return res.status(200).json(result)
      .catch( err => {
        return res.status(500).json({ message: 'Lo sentimos, Hubo un problema en responder tu solicitud.' });
      })
    });
  }

}
export default AccuController
