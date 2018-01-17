var mongoose = require('mongoose');

// Pour modéliser les données, le framework mongoose utilise des "schémas" ; nous créons donc un modèle de données :
var placeSchema = mongoose.Schema({
    name: String,
    badges: [String],
    type: String,
    infos: {
      adresse: String,
      openHour: String,
      closeHour: String
    },
    photos: Array,
    club: String,
});

var Place = mongoose.model('Place', placeSchema, 'place');

module.exports = Place;
