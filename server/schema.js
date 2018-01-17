var mongoose = require('mongoose');

// Pour modéliser les données, le framework mongoose utilise des "schémas" ; nous créons donc un modèle de données :
var placeSchema = mongoose.Schema({
    name: String,
});

var Place = mongoose.model('Place', placeSchema);

module.exports = Place;
