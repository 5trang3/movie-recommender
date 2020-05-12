import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

const DatePicker = (props) => {

  const theme = useTheme();
  const contrastText = theme.palette.primary.contrastText;
  const useStyles = makeStyles({
    root: {
      minWidth: '120px'
    },
    label: {
      color: contrastText
    },
    input: {
      color: contrastText,
      '&::before': {
        borderBottomColor: contrastText
      },
      '&:hover:not(.Mui-disabled)::before': {
        borderBottomColor: contrastText
      }
    },
    button: {
      color: contrastText
    },
  });

  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={ DateFnsUtils }>
      <KeyboardDatePicker format={ props.format } maxDate={ props.maxDate } minDate={ props.minDate } label={ props.label } onChange={ props.handleChange } views={ props.views } value={ props.value } InputLabelProps={{ className: classes.label }} InputProps={{ className: classes.input }} KeyboardButtonProps={{ className: classes.button }}></KeyboardDatePicker>
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker;
