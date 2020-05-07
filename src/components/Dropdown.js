import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const Dropdown = (props) => {
  return (
    <FormControl style={{ minWidth: 120 }}>
      <InputLabel>{ props.label }</InputLabel>
      <Select labelId={ props.labelId } id={ props.id } onChange={ props.handleChange } value={ props.value }>
        { props.options }
      </Select>
    </FormControl>
  )
}

export default Dropdown;
