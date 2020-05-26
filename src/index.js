import ReactDOM from 'react-dom';
import React from 'react'
import {App} from './App.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E58F65',
    },
    secondary: {
      main: '#4EC5A7',
    },
    background: {
      paper: '#FFFDE8'
    },
  },
});

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

ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <App imdbGenres={imdbGenres} rowHeadings={rowHeadings} subHeadings={subHeadings}/>
  </ThemeProvider>, document.getElementById('root'))
