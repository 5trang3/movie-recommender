import React from 'react';
import Box from '@material-ui/core/Box';
import Badge from './Badge.js';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Movie = (props) => {
    let genreAdjustedScore;
    for (const scoreObj of props.movie.genreAdjustedScores) {
      if (scoreObj[props.genre]) {
        genreAdjustedScore = scoreObj[props.genre]
      }
    }
    return(
        <Box class='grid-item' style={{ height: '450px', width: '185px' }}>
          <Badge rating={ genreAdjustedScore }/>
          <Card>
            <a href={ 'https://imdb.com/title/' + props.movie.id}>
              <CardMedia image={ props.movie.posterPath } style={{ height: '278px', backgroundSize: 'contain'}}>
              </CardMedia>
            </a>
            <CardContent style={{ height: '70px'}}>
              <Typography variant='subtitle1' style={{ textAlign: 'center' }}>
                {props.movie.title}
              </Typography>
            </CardContent>
          </Card>
        </Box>
    )
  }

export default Movie
