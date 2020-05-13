import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Movie from './Movie.js';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

const MovieRow = (props) => {
  const theme = useTheme();
  const spacing = theme.spacing(2);
  const useStyles = makeStyles({
      root: {
        marginBottom: spacing
      }
  });
  const classes = useStyles();
  const Movies = props.movies.map((movie) => <Movie movie={movie} genre={props.genre}></Movie>)
  return (
    <Container>
      <Container>
        <Typography variant='h2'>{ props.rowHeading }</Typography>
        <Typography variant='h3'>{ props.subHeading }</Typography>
        <div class='grid'>
          { Movies }
        </div>
      </Container>
      <Divider className={ classes.root }/>
    </Container>
  )
}

export default MovieRow
