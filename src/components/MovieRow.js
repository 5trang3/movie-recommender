import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Movie from './Movie.js'

const MovieRow = (props) => {
  const Movies = props.movies.map((movie) => <Movie movie={movie} genre={props.genre}></Movie>)
  return (
    <Container>
      <Typography variant='h2'>{ props.rowHeading }</Typography>
      <Typography variant='h3'>{ props.subHeading }</Typography>
      <div class='grid'>
        { Movies }
      </div>
    </Container>
  )
}

export default MovieRow
