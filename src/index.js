import ReactDOM from 'react-dom';
import React from 'react'
import {imdbGenres, rowHeadings, App} from './App.js';

ReactDOM.render(<App imdbGenres={imdbGenres} rowHeadings={rowHeadings}/>, document.getElementById('root'))
