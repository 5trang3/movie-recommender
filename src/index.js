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

    return (
      <div id='app'>
        <div id='genreDropdownContainer'>
          <label id='genreDropdownLabel'>Choose a Genre:</label>
          <select id='genreDropdown' value={this.state.genre} onChange={this.handleGenreChange}>
            {genreOptions}
          </select>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App imdbGenres={imdbGenres}/>, document.getElementById('root'))
