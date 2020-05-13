import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Dropdown = (props) => {
  const theme = useTheme();
  const contrastText = theme.palette.primary.contrastText;
  const margin = theme.spacing(1);
  const inputLabelStyles = makeStyles({
    root: {
      color: contrastText
    }
  });
  const selectStyles = makeStyles({
    select: {
      '&:before': {
        borderColor: contrastText
      },
      color: contrastText,
      '&:hover:not(.Mui-disabled)::before': {
        borderBottomColor: contrastText
      }
    },
    icon: {
      fill: contrastText
    }
  });
  const formControlStyles = makeStyles({
    root: {
      marginRight: margin,
      minWidth: '120px'
    }
  });

  const formControlClasses = formControlStyles();
  const inputLabelClasses = inputLabelStyles();
  const selectClasses = selectStyles();
  const options = props.options.map(function(option) {
    return <MenuItem value={ option }>{ option }</MenuItem>
  })
  return (
    <FormControl className={ formControlClasses.root }>
      <InputLabel className={ inputLabelClasses.root }>{ props.label }</InputLabel>
      <Select labelId={ props.labelId } id={ props.id } onChange={ props.handleChange } value={ props.value } className={ selectClasses.select } inputProps={{ classes: { icon: selectClasses.icon }}}>
        { options }
      </Select>
    </FormControl>
  )
}

export default Dropdown;
