const mongoose = require('mongoose');
const lineReader = require('line-reader');

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
  language: String,
  genreAdjustedScores: [{}],
  rating: Number
}))

Movie.find({})
     .then(function(movies) {
       const idArr = movies.map(movie => movie.id);
       lineReader.eachLine('../data/title.ratings.tsv/data.tsv', function(line) {
       const ratingArr = line.split('\t');
       const id = ratingArr[0];
       const rating = ratingArr[1];
       if (idArr.includes(id)) {
         return Movie.findOneAndUpdate({ id: id }, { rating: Number(rating) }, function(err, updatedMovie) {
           if (err) {
             console.error(err)
           }
           else if (updatedMovie) {
             console.log(updatedMovie.id)
           }
         })
       }
       });
     })
     .catch(err => console.error(err))
