import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    borderRadius: '50%',
    position: 'relative',
    width: '35px',
    height: '35px',
    textAlign: 'center',
    top: '25px',
    left: '160px',
    '& p': {
    padding: '6px',
  }
}
});

const Badge = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box className={ classes.root } style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
      <Typography>
       { props.rating }
      </Typography>
    </Box>
  )
}

export default Badge;
