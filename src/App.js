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
      movies: [[],[],[],[],[],[]]
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
      console.log(this.state)
      return <MovieRow id={'movieRow-' + index} rowHeading={rowHeading} movies={this.state.movies[index]} genre={this.state.genre}/>
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
    const Movies = this.props.movies.map((movie) => <Movie movie={movie} genre={this.props.genre}></Movie>)

    return (
      <div id={this.props.id}>
        <h2>{this.props.rowHeading}</h2>
        {Movies}
      </div>
    )
  }
}

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let genreAdjustedScore;
    for (const scoreObj of this.props.movie.genreAdjustedScores) {
      if (scoreObj[this.props.genre]) {
        genreAdjustedScore = scoreObj[this.props.genre]
      }
    }
    return(
      <div class='Movie'>
        <h3>{this.props.movie.title}</h3>
        <div>{this.props.movie.rating}</div>
        <div>{genreAdjustedScore}</div>
      </div>
    )
  }
}
