var express = require('express');

// L'object qui contient le schéma de nos données via mongoose
var Place = require('./schema.js');

// Notre router
var myRouter = express.Router();

myRouter.route('/')
.all(function(req,res){
  res.json({message : "Bienvenue sur la première API de Fanny et Samy !", methode : req.method});
});

// Liste de résultats
myRouter.route('/results')
// GET
.get(function(req,res){
// Utilisation de notre schéma Place pour interrogation de la base
  Place.find(function(err, places){
    if (err){
      res.send(err);
    }
    res.json(places);
  });
});

var place = new Place();

myRouter.route('results/add')
// POST
.post(function(req,res){
    // Nous récupérons les données reçues pour les ajouter à l'objet Place
  place.name = req.body.name;
  //Nous stockons l'objet en base
  place.save(function(err){
    if(err){
      res.send(err);
    }
    res.send({message : 'Bravo, le lieu est ajouté à la base de donnée !'});
  })
});

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

module.exports = myRouter;
