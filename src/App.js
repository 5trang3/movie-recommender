import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Calendar from 'react-calendar'

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
      genre: '',
      year: ''
    };
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  };

  // Event handler for changing genres:
  handleGenreChange(event) {
    const genre = event.target.value;
    this.setState(state => ({
      genre: genre,
      year: state.year
    }))
  }

  // Event handler for changing years:
  handleYearChange(date) {
    this.setState(state => ({
      genre: state.genre,
      year: date
    }))
  }

  render() {

    // Get array of option elements for each genre
    const genreOptions = this.props.imdbGenres.map(function(genre) {
      return <option value={genre}>{genre}</option>
    })

    // Create array of movie rows:
    const movieRows = this.props.rowHeadings.map(function(rowHeading, index) {
      return <MovieRow id={'movieRow-' + index} rowHeading={rowHeading}/>
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
        <div>{this.state.year.toString()}</div>
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
