const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Adds the react production build to serve react requests

app.use(express.static(path.join(__dirname, “../client/build”)));

// React root

app.get(“*”, (req, res) => {res.sendFile(path.join(__dirname + “../client/build/index.html”));});

// Connect to db:
mongoose.connect('mongodb+srv://guest:px4415ZrhdEF6U0h@url-shortener-db-gbfnq.mongodb.net/test?retryWrites=true&w=majority', {
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
  const filter = { language: 'en'};
  year ? filter.year = year : res.send('Missing year information');
  genre ? filter.genres = genre : res.send('Missing genre information');
  Movie.find(filter)
       .then(function(movies) {
         if (movies.length === 0) { res.json([[],[],[],[],[]]) }
         else {
           let movieArr = [[],[],[],[],[]]
           for (const movie of movies) {
             let rating;
             for (const scoreObj of movie.genreAdjustedScores) {
               if (scoreObj[genre]) {
                 rating = scoreObj[genre];
               }
             }
               if (rating <= 10 && rating >= 8.6) { movieArr[0].push(movie); }
               else if (rating < 8.6 && rating >= 7) { movieArr[1].push(movie); }
               else if (rating < 7 && rating >= 5) { movieArr[2].push(movie); }
               else if (rating < 5 && rating >= 3) { movieArr[3].push(movie); }
               else { movieArr[4].push(movie) }
           }
           for (const categoryArr of movieArr) {
             categoryArr.sort((movie1, movie2) => {
               let score1;
               let score2;
               for (const scoreObj of movie1.genreAdjustedScores) {
                 if (scoreObj[genre]) {
                   score1 = scoreObj[genre]
                 }
               }
               for (const scoreObj of movie2.genreAdjustedScores) {
                 if (scoreObj[genre]) {
                   score2 = scoreObj[genre]
                 }
               }
               return score2 - score1
             })
           }
           res.json(movieArr)
         }
       })
       .catch(err => console.error(err))
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
