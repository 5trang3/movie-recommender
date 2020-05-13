import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SimplePopover from './components/SimplePopover.js'
import Dropdown from './components/Dropdown.js'
import DatePicker from './components/DatePicker.js';
import MovieRow from './components/MovieRow.js'

// Material-UI imports:
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormHelperText from '@material-ui/core/FormHelperText';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

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
    const genreOptions = this.props.imdbGenres

    // Create array of movie rows:
    const movieRows = this.props.rowHeadings.map((rowHeading, index) => {
      return <MovieRow id={'movieRow-' + index} rowHeading={rowHeading} subHeading={this.props.subHeadings[index]} movies={this.state.movies[index]} genre={this.state.genre}/>
    })

    return (
      <div id='app'>
        <AppBar>
          <Toolbar>
            <Dropdown label='Genre' labelId='genreSelectLabel' id='genreSelect' handleChange={ this.handleGenreChange } value={ this.state.genre } options={ genreOptions }/>
            <DatePicker format='yyyy' maxDate={ new Date('2020') } minDate={ new Date('1915') }label='Year' handleChange={ this.handleYearChange } views={ ['year'] } value={ this.state.year}/>
            <SimplePopover></SimplePopover>
          </Toolbar>
        </AppBar>
        <Toolbar/>
        {movieRows}
      </div>
    )
  }
}
