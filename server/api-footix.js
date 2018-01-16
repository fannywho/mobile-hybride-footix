//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.
var express = require('express');

// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost';
var port = 3000;

// La variable mongoose nous permettra d'utiliser les fonctionnalités du module mongoose.
var mongoose = require('mongoose');
// Ces options sont recommandées par mLab pour une connexion à la base
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

//URL de notre base
var urlmongo = "mongodb://groupe4:pokemon1006@ds159187.mlab.com:59187/footix";

// Nous connectons l'API à notre base de données
mongoose.connect(urlmongo, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});

// Pour modéliser les données, le framework mongoose utilise des "schémas" ; nous créons donc un modèle de données :
var placeSchema = mongoose.Schema({
    name: String,
});

var Place = mongoose.model('Place', placeSchema);

// Nous créons un objet de type Express.
var app = express();

// body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes.
var myRouter = express.Router();

myRouter.route('/')
// all permet de prendre en charge toutes les méthodes.
.all(function(req,res){
      res.json({message : "Bienvenue sur la première API de Fanny et Samy !", methode : req.method});
});

// Je vous rappelle notre route (/piscines).
myRouter.route('/results')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){
// Utilisation de notre schéma Piscine pour interrogation de la base
  Place.find(function(err, places){
    if (err){
        res.send(err);
    }
    res.json(places);
  });
})
// POST
.post(function(req,res){
  // Nous utilisons le schéma Piscine
    var place = new Place();
  // Nous récupérons les données reçues pour les ajouter à l'objet Piscine
    place.name = req.body.name;
  //Nous stockons l'objet en base
    place.save(function(err){
      if(err){
        res.send(err);
      }
      res.send({message : 'Bravo, le lieu est ajouté à la bdd !'});
    })
})
//PUT
.put(function(req,res){
      res.json({message : "Met à jour un lieu", methode : req.method});
})
//DELETE
.delete(function(req,res){
res.json({message : "Suppression d'un lieu", methode : req.method});
});

// route vers d'une page
myRouter.route('/results/:place_id')
.get(function(req,res){
    //Mongoose prévoit une fonction pour la recherche d'un document par son identifiant
    place.findById(req.params.place_id, function(err, place) {
    if (err)
      res.send(err);
    res.json(piscine);
  });
})
.put(function(req,res){
// On commence par rechercher la piscine souhaitée
  Place.findById(req.params.place_id, function(err, place) {
    if (err){
      res.send(err);
    }
  // Mise à jour des données de la piscine
  place.nom = req.body.nom;
    place.save(function(err){
      if(err){
        res.send(err);
      }
      // Si tout est ok
      res.json({message : 'Bravo, mise à jour des données OK'});
    });
  });
})
.delete(function(req,res){
  Place.remove({_id: req.params.place_id}, function(err, place){
    if (err){
        res.send(err);
    }
    res.json({message:"Bravo, lieu supprimé"});
  });
});

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);

// Démarrer le serveur
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
