import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Badge from './Badge.js';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    '& a': {
      textDecoration: 'none'
    }
  }
});

const Movie = (props) => {
    let genreAdjustedScore;
    for (const scoreObj of props.movie.genreAdjustedScores) {
      if (scoreObj[props.genre]) {
        genreAdjustedScore = scoreObj[props.genre]
      }
    }
    const [isRaised, toggleRaised] = useState(false);
    const classes = useStyles();
    return(
        <Box style={{ height: '450px', width: '185px' }} className={ classes.root }>
          <Badge rating={ genreAdjustedScore }/>
          <a href={ 'https://imdb.com/title/' + props.movie.id}>
            <Card onMouseEnter={ () =>  toggleRaised (true) } onMouseLeave={ () =>  toggleRaised (false) } raised={ isRaised }>
              <CardMedia image={ props.movie.posterPath } style={{ height: '278px', backgroundSize: 'contain'}}>
              </CardMedia>
              <CardContent style={{ height: '70px'}}>
                <Typography variant='subtitle1' style={{ textAlign: 'center' }}>
                  {props.movie.title}
                </Typography>
              </CardContent>
            </Card>
          </a>
        </Box>
    )
  }

export default Movie
