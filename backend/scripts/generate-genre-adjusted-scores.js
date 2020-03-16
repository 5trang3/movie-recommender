const mongoose = require('mongoose');
const d3 = require('d3');

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

// Array of imdb genres
const imdbGenres = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film-Noir',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western'
]

for (const genre of imdbGenres) {
  Movie.find({ genres: genre, language: 'en' })
       .then(function(movies) {
         const ratings = movies.map(movie => movie.rating);
         const avgRating = d3.mean(ratings);
         const maxRating = d3.max(ratings);
         const minRating = d3.min(ratings);
         const scaleLower = d3.scaleLinear().domain([minRating, avgRating]).range([0, 5]);
         const scaleUpper = d3.scaleLinear().domain([avgRating, maxRating]).range([5, 10]);
         for (const movie of movies) {
           if (movie.rating <= avgRating) {
             movie.genreAdjustedScores.push({ [genre]: Math.round((scaleLower(movie.rating) * 10)) / 10 });
           }
           else {
             movie.genreAdjustedScores.push({ [genre]: Math.round((scaleUpper(movie.rating) * 10)) / 10 });
           }
           movie.save()
                .then(updatedMovie => console.log([updatedMovie.id, updatedMovie.genreAdjustedScores]))
                .catch(err => console.error(err))
         }
       })
       .catch(err => console.error(err))
}
