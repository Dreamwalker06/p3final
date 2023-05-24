module.exports = {
	dialect: "sqlite",
	storage: './database.sqlite'
};

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware body-parser avec une limite de taille plus élevée (50 Mo)
app.use(bodyParser.json({ limit: '50mb' }));

// ... Reste de la configuration du serveur
