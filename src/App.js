import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
  'Genre classics',
  'Must watch for all movie lovers',
  'Must watch for all genre fans',
  'Meh',
  'Don\'t waste your time',
  'Burn it alive!'
]
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: ''
    };
    this.handleGenreChange = this.handleGenreChange.bind(this);
  };

  // Event handler for changing genres:
  handleGenreChange(event) {
    this.setState({
      genre: event.target.value
    });
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
        <div id='genreDropdownContainer'>
          <label id='genreDropdownLabel'>Choose a Genre:</label>
          <select id='genreDropdown' value={this.state.genre} onChange={this.handleGenreChange}>
            {genreOptions}
          </select>
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

ReactDOM.render(<App imdbGenres={imdbGenres} rowHeadings={rowHeadings}/>, document.getElementById('root'))
