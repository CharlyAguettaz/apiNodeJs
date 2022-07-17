const express = require("express");
const bodyParser = require('body-parser');

const actorsRoutes = require('./routes/actors');
const filmsRoutes = require('./routes/films');
const genresRoutes = require('./routes/genres');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// Routes "Actors"
app.use('/api/actors', actorsRoutes);

// Routes "Films"
app.use('/api/films', filmsRoutes);

// Routes "Genres"
app.use('/api/genres', genresRoutes);

// Fallback route
app.use((req, res) => {
    res.status(404);
});