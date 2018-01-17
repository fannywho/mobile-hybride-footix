//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.
var express = require('express');

// Body Parser
var bodyParser = require("body-parser");

// Nos routes
var router = require('./routes.js');

// MONGOOSE
var mongoose = require('mongoose');
// Ces options sont recommandées par mLab pour une connexion à la base
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

// URL de notre base
var urlmongo = "mongodb://groupe4:pokemon1006@ds159187.mlab.com:59187/footix";

// Nous connectons l'API à notre base de données
mongoose.connect(urlmongo, options);

// Feedback sur la connexion
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});

// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost';
var port = 8000;

// Nous créons un objet de type Express.
var app = express();

// // Nous demandons à l'application d'utiliser body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nous demandons à l'application d'utiliser notre routeur
app.use(router);

// Call Api From a different Port
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Démarrer le serveur
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
