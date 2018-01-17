var mongoose = require('mongoose');

// Pour modéliser les données, le framework mongoose utilise des "schémas" ; nous créons donc un modèle de données :
var placeSchema = mongoose.Schema({
    name: String,
    badges: [String],
    type: String,
    adresse: String,
    openHour: String,
    closeHour: String,
    photos: [String],
    club: String,
});

var badgeSchema = mongoose.Schema({
    name: String,
    description: String,
    icon: [String],
});

var clubSchema = mongoose.Schema({
    name: String,
    icon: String,
});


var Place = mongoose.model('Place', placeSchema, 'place');
var Badge = mongoose.model('Badge', badgeSchema, 'badge');
var Club = mongoose.model('Club', clubSchema, 'club');

module.exports = {
  place: Place,
  club: Club,
  badge: Badge,
};
