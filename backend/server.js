const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Connect to db:
mongoose.connect('mongodb+srv://admin:DruWH3arT@url-shortener-db-gbfnq.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Define model:
const Movie = mongoose.model('Movie', new mongoose.Schema({
  genres: [String],
  id: String,
  numVotes: Number,
  title: String,
  year: Date,
  runtime: Number,
  language: String,
  genreAdjustedScores: [{}],
  rating: Number
}))

app.get('/api/movies', function(req, res) {
  const year = new Date(req.query.year);
  const genre = req.query.genre;
  const filter = {};
  year ? filter.year = year : res.send('Missing year information');
  genre ? filter.genres = genre : res.send('Missing genre information');
  Movie.find(filter)
       .then(function(movies) {
         if (movies.length === 0) { res.send('No movies found') }
         else { res.json(movies) }
       })
       .catch(err => console.error(err))
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
