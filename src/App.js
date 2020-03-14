import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Calendar from 'react-calendar';

const superagent = require('superagent')

// Array of IMDB genres:
export const imdbGenres = [
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
export const rowHeadings = [
  'Genre classics',
  'Must watch for all movie lovers',
  'Must watch for all genre fans',
  'Meh',
  'Don\'t waste your time',
  'Burn it alive!'
]

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: 'Action',
      year: new Date('2020'),
      movies: []
    };
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
  };

  componentDidMount() {
    this.fetchMovies()
  }

  componentDidUpdate() {
    this.fetchMovies()
  }

  // Method to fetch movies
  fetchMovies() {
    const year = this.state.year;
    const genre = this.state.genre;
    superagent.get('http://127.0.0.1:4000/api/movies?year=' + year.getFullYear().toString() + '&genre=' + genre)
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
      return <option value={genre}>{genre}</option>
    })

    // Create array of movie rows:
    const movieRows = this.props.rowHeadings.map((rowHeading, index) => {
      const movies = this.state.movies.filter((movie) => {
        const withinRange = (minRating, maxRating) => {
          for (const scoreObj of movie.genreAdjustedScores) {
            if (scoreObj[this.state.genre]) {
              return (scoreObj[this.state.genre] <= maxRating && scoreObj[this.state.genre] >= minRating)
            }
          }
        }
        switch (index) {
          case 0: return withinRange(9.0, 10.0)
          case 1: return withinRange(8.0, 8.9)
          case 2: return withinRange(7.0, 7.9)
          case 3: return withinRange(5.0, 6.9)
          case 4: return withinRange(3.0, 4.9)
          case 5: return withinRange(0, 2.9)
        }
      })
      return <MovieRow id={'movieRow-' + index} rowHeading={rowHeading} movies={movies}/>
    })

    return (
      <div id='app'>
        <div id='options'>
          <div id='genreDropdownContainer'>
            <label id='genreDropdownLabel'>Choose a Genre:</label>
            <select id='genreDropdown' value={this.state.genre} onChange={this.handleGenreChange}>
              {genreOptions}
            </select>
          </div>
          <div id='yearSelectionContainer'>
            <p id='yearSelectionLabel'>Choose a Year:</p>
            <Calendar view='decade' maxDate={ new Date('2020') }  minDate={ new Date('1915') } className='calendar' value={ this.state.year } onClickYear={ this.handleYearChange }/>
          </div>
        </div>
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
    return (
      <div id={this.props.id}>
        <h2>{this.props.rowHeading}</h2>
      </div>
    )
  }
}
