import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SimplePopover from './components/SimplePopover.js'
import Movie from './components/Movie.js'

// Material-UI imports:
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const superagent = require('superagent')

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: 'Action',
      year: new Date('2020'),
      movies: [[],[],[],[],[]],
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
                this.setState({
                  movies: res.body
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
    const genreOptions = this.props.imdbGenres.map(function(genre) {
      return <MenuItem value={genre}>{genre}</MenuItem>
    })

    // Create array of movie rows:
    const movieRows = this.props.rowHeadings.map((rowHeading, index) => {
      return <MovieRow id={'movieRow-' + index} rowHeading={rowHeading} subHeading={this.props.subHeadings[index]} movies={this.state.movies[index]} genre={this.state.genre}/>
    })

    return (
      <div id='app'>
        <AppBar>
          <Toolbar>
            <FormControl style={{ minWidth: 120 }} color='secondary'>
              <InputLabel>Genre</InputLabel>
              <Select labelId='genreSelectLabel' id='genreSelect' onChange={ this.handleGenreChange } value={ this.state.genre }>
                { genreOptions }
              </Select>
              <FormHelperText>Select a genre</FormHelperText>
            </FormControl>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
              <KeyboardDatePicker format='yyyy' style={{ minWidth: 120 }} maxDate={ new Date('2020') } minDate={ new Date('1915') }label='Year' onChange={ this.handleYearChange } views={ ['year'] } value={ this.state.year}></KeyboardDatePicker>
            </MuiPickersUtilsProvider>
            <SimplePopover></SimplePopover>
          </Toolbar>
        </AppBar>
        <Toolbar/>
        {movieRows}
      </div>
    )
  }
}

class MovieRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Movies = this.props.movies.map((movie) => <Movie movie={movie} genre={this.props.genre}></Movie>)

    return (
      <Container>
        <Typography variant='h2'>{ this.props.rowHeading }</Typography>
        <Typography variant='h3'>{ this.props.subHeading }</Typography>
        <div class='grid'>
          {Movies}
        </div>
      </Container>
    )
  }
}
