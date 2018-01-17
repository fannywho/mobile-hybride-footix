var express = require('express');

// L'object qui contient le schéma de nos données via mongoose
var Schema = require('./schema.js');
var Place  = Schema.place;
var Badge  = Schema.badge;
var Club   = Schema.club;

// Notre router
var myRouter = express.Router();

myRouter.route('/')
.all(function(req,res){
  res.json({message : "Bienvenue sur la première API de Fanny et Samy !", methode : req.method});
});

var place = new Place();

// Liste de résultats
myRouter.route('/results')
// GET
.get(function(req,res){
// Utilisation de notre schéma Place pour interrogation de la base
  Place.find(function(err, place){
    if (err){
      res.send(err);
    }
    res.json(place);
  });
});

myRouter.route('/add')
// POST
.post(function(req,res){
  var place = new Place();
    // Nous récupérons les données reçues pour les ajouter à l'objet Place
  place.name            = req.body.name;
  place.type            = req.body.type;
  place.club            = req.body.club;
  place.city            = req.body.city;
  place.badges          = req.body.badges;
  place.photos          = req.body.photos;
  place.adresse         = req.body.adresse;
  place.openHour        = req.body.openHour;
  place.closeHour       = req.body.closeHour;

  //Nous stockons l'objet en base
  place.save(function(err){
    if(err){
      res.send(err);
    }
    res.send({message : 'Bravo, le lieu est ajouté à la base de donnée !'});
  })
});


myRouter.route('/results/:place_city')
// GET
.get(function(req,res){
  //Mongoose prévoit une fonction pour la recherche d'un document par son identifiant
  Place.find({ city: req.params.place_city }, function(err, place) {
    if (err)
      res.send(err);
    res.json(place);
  });
})

myRouter.route('/results/:place_city/:place_club')
// GET
.get(function(req,res){
  //Mongoose prévoit une fonction pour la recherche d'un document par son identifiant
  Place.find({ city: req.params.place_city, club: req.params.place_club }, function(err, place) {
    if (err)
      res.send(err);
    res.json(place);
  });
})

myRouter.route('/results/:place_id')
// GET
.get(function(req,res){
  //Mongoose prévoit une fonction pour la recherche d'un document par son identifiant
  Place.findById(req.params.place_id, function(err, place) {
    if (err)
      res.send(err);
    res.json(place);
  });
})
// PUT
.put(function(req,res){
// On commence par rechercher le lieu souhaité
  Place.findById(req.params.place_id, function(err, place) {
    if (err){
      res.send(err);
    }
  // Mise à jour des données de la piscine
  place.name = req.body.name;
    place.save(function(err){
      if(err){
        res.send(err);
      }
      // Si tout est ok
      res.json({message : 'Bravo, mise à jour des données OK'});
    });
  });
})
// DELETE
.delete(function(req,res){
  Place.remove({_id: req.params.place_id}, function(err, place){
    if (err){
      res.send(err);
    }
    res.json({message:"Bravo, lieu supprimé"});
  });
});


// Liste des badges
myRouter.route('/badges')
// GET
.get(function(req,res){
// Utilisation de notre schéma Place pour interrogation de la base
  Badge.find(function(err, badge){
    if (err){
      res.send(err);
    }
    res.json(badge);
  });
});

// Liste des clubs
myRouter.route('/clubs')
// GET
.get(function(req,res){
// Utilisation de notre schéma Place pour interrogation de la base
  Club.find(function(err, club){
    if (err){
      res.send(err);
    }
    res.json(club);
  });
});


module.exports = myRouter;
