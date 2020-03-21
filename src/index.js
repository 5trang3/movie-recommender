import ReactDOM from 'react-dom';
import React from 'react'
import {App} from './App.js';

// Array of IMDB genres:
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
  'Film Noir',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Short',
  'Sport',
  'Superhero',
  'Thriller',
  'War',
  'Western'
]

// Array of row headings:
const rowHeadings = [
  'Genre Classics',
  'Highlights of the Year',
  'Best of the Rest',
  'Time Wasters',
  'Hot Garbage',
]

const subHeadings = [
  'Movies that will define the genre for years to come',
  'The best movies the genre has to offer this year',
  'Good movies that are worth watching for genre fans',
  'Movies that are not worth anyone\'s time',
  'Movies that may make you lose some brain cells'
]

ReactDOM.render(<App imdbGenres={imdbGenres} rowHeadings={rowHeadings} subHeadings={subHeadings}/>, document.getElementById('root'))
