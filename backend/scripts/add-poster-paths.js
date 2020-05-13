const mongoose = require('mongoose');
const superagent = require('superagent');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Connect to db:
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + process.env.DB_HOST, {
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
  rating: Number,
  posterPath: String
}))

  // Fetch all movies:
  Movie.find({}, function(err, results) {
    if (err) {
      console.error(err)
    }
    else {
      for (const movie of results) {
        superagent.get('https://api.themoviedb.org/3/find/' + movie.id)
                  .query({ api_key: process.env.TMDB_API_KEY, external_source: 'imdb_id' })
                  .then(response => {
                    if (response.body.movie_results[0].poster_path) {
                      movie.posterPath = 'https://image.tmdb.org/t/p/w185' + response.body.movie_results[0].poster_path;

                    }
                    else {
                      movie.posterPath = null
                    }
                    return movie.save()
                  })
                  .then(movie => console.log(movie.posterPath))
                  .catch(err => console.error(err))
      }
    }
  })
