const mongoose = require('mongoose');
const superagent = require('superagent');
const tmdb_api_key = '';
const password = '';

// Connect to db:
mongoose.connect('mongodb+srv://admin:<password>@url-shortener-db-gbfnq.mongodb.net/test?retryWrites=true&w=majority', {
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
  language: String
}))

// Fetch all movies:
Movie.find({}, function(err, results) {
  if (err) {
    console.error(err)
  }
  else {
    for (const movie of results) {
      superagent.get('https://api.themoviedb.org/3/find/' + movie.id)
                .query({ api_key: tmdb_api_key, external_source: 'imdb_id' })
                .then(response => Movie.updateOne({ id: movie.id }, { language: response.body.movie_results[0].original_language }))
                .catch(err => console.error(err))
    }
  }
})
