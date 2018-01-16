//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.
var express = require('express');
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost';
var port = 3000;

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
 res.json({
 message : "Liste des lieux correspondants avec les paramètres :",
 ville : req.query.ville,
 club : req.query.club,
 from: req.query.from,
 to: req.query.to,
 methode : req.method });
})
// POST
.post(function(req,res){
 res.json({message : "Ajoute un nouveau lieu à la liste",
 nom : req.body.nom,
 ville : req.body.ville,
 description : req.body.description,
 infos : req.body.infos,
 badges: req.body.badges,
 methode : req.method});
})
//PUT
.put(function(req,res){
      res.json({message : "Met à jour un lieu", methode : req.method});
})
//DELETE
.delete(function(req,res){
res.json({message : "Suppression d'un lieu", methode : req.method});
});

myRouter.route('/results/:place_id')
.get(function(req,res){
	  res.json({message : "Vous souhaitez accéder aux informations du lieu n°" + req.params.place_id});
})
.put(function(req,res){
	  res.json({message : "Vous souhaitez modifier les informations du lieu n°" + req.params.place_id});
})
.delete(function(req,res){
	  res.json({message : "Vous souhaitez supprimer le lieu n°" + req.params.place_id});
});

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);

// Démarrer le serveur
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
