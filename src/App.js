import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SimplePopover from './components/SimplePopover.js'
import MovieRow from './components/MovieRow.js'
import Appbar from './components/Appbar.js'

// Material-UI imports:
import Toolbar from '@material-ui/core/Toolbar';
import FormHelperText from '@material-ui/core/FormHelperText';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';

const superagent = require('superagent')

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: 'Action',
      year: new Date('2020'),
      movies: [[],[],[],[],[]],
      alerts: { noMoviesFound: 1 }
    };
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
  };

  componentDidMount() {
    this.fetchMovies()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.year !== this.state.year || prevState.genre !== this.state.genre) {
      this.fetchMovies()
    }
  }

  // Method to fetch movies
  fetchMovies() {
    const year = this.state.year;
    const genre = this.state.genre;
    superagent.get('/api/movies?year=' + year.getFullYear().toString() + '&genre=' + genre)
              .then((res) => {
                // Count the number of movies returned:
                const numMovies = res.body.reduce(function(acc, cur) {
                  return acc += cur.length;
                }, 0);

                // If no movies, create alert state:
                const alerts = Object.assign(this.state.alerts, {});
                alerts.noMoviesFound = numMovies ? 1 : 0;
                
                // Update state of movies and alerts:
                this.setState({
                  movies: res.body,
                  alerts: alerts
                })
              })
              .catch(err => console.error(err))
  }

  // Event handler for changing genres:
  handleGenreChange(event) {
    const genre = event.target.value;
    this.setState({
      genre: genre
    })
  }

  // Event handler for changing years:
  handleYearChange(date) {
    this.setState({
      year: date
    })
  }

  render() {
    // Get array of option elements for each genre
    const genreOptions = this.props.imdbGenres

    // Create array of movie rows:
    const movieRows = this.props.rowHeadings.map((rowHeading, index) => {
      return this.state.movies[index].length ?
      <MovieRow id={'movieRow-' + index} rowHeading={rowHeading} subHeading={this.props.subHeadings[index]} movies={this.state.movies[index]} genre={this.state.genre}/> :
      null
    })

    // Create dropdown options:
    const dropdownOptions = {
      label:'Genre',
      labelId:'genreSelectLabel',
      id:'genreSelect',
      handleChange: this.handleGenreChange,
      value: this.state.genre,
      options: genreOptions
    }

    // Create datepicker options:
    const datepickerOptions = {
      format: 'yyyy',
      maxDate: new Date('2020'),
      minDate: new Date('1915'),
      label: 'Year',
      handleChange: this.handleYearChange,
      views: ['year'],
      value: this.state.year
    }

    // Create alerts:

    const noMoviesFound = this.state.alerts.noMoviesFound ? null : <Alert severity='info'>There are no movies found matching your search parameters</Alert>

    return (
      <div id='app'>
        <Appbar dropdownOptions={ dropdownOptions } datepickerOptions={ datepickerOptions }/>
        <Toolbar/>
        {movieRows}
        { noMoviesFound }
      </div>
    )
  }
}
