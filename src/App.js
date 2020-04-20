import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Calendar from 'react-calendar';

// Material-UI Imports:
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const superagent = require('superagent')

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: 'Action',
      year: new Date('2020'),
      movies: [[],[],[],[],[]]
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
      return <option value={genre}>{genre}</option>
    })

    // Create array of movie rows:
    const movieRows = this.props.rowHeadings.map((rowHeading, index) => {
      return <MovieRow id={'movieRow-' + index} rowHeading={rowHeading} subHeading={this.props.subHeadings[index]} movies={this.state.movies[index]} genre={this.state.genre}/>
    })

    return (
      <div id='app'>
        <AppBar>
          <Toolbar>
            <div id='genreDropdownContainer'>
              <label id='genreDropdownLabel'>Choose a Genre:</label>
              <select id='genreDropdown' value={this.state.genre} onChange={this.handleGenreChange} class='select-css'>
                {genreOptions}
              </select>
            </div>
            <div id='yearSelectionContainer'>
              <label id='yearSelectionLabel'>Choose a Year:</label>
              <Calendar view='decade' maxDate={ new Date('2020') }  minDate={ new Date('1915') } className='calendar' value={ this.state.year } onClickYear={ this.handleYearChange }/>
            </div>
            <div id='legend'>
              <p>
                The ratings in pink <div class='genreScore score'>S</div> are genre adjusted scores.
                Ratings on IMDB are higher on average for some genres compared to others. Often this
                is a reflection of reviewer biases against certain genres. This adjusted score normalizes
                the data for these biases and gives a more accurate rating for movies within genres.
              </p>
            </div>
          </Toolbar>
        </AppBar>
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
      <div>
        <h2 class='rowHeading'>{this.props.rowHeading}</h2>
        <p class='subHeading'>{this.props.subHeading}</p>
        <div id={this.props.id} class='movieRow'>
          {Movies}
        </div>
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
      <div class='movie'>
        <a href={ 'https://imdb.com/title/' + this.props.movie.id}><img class='image' src={this.props.movie.posterPath}/></a>
        <p>{this.props.movie.title}</p>
        <div class='genreScore score'>{genreAdjustedScore}</div>
      </div>
    )
  }
}
