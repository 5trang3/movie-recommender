// Import React:
import React from 'react';

// Import Material-UI components:
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// Import Material-UI style function:
import { makeStyles } from '@material-ui/core/styles';

// Import custom components:
import SimplePopover from './SimplePopover.js'
import Dropdown from './Dropdown.js'
import DatePicker from './DatePicker.js';

const Appbar = (props) => {
  return (
    <AppBar>
      <Toolbar>
        <div>
          <Dropdown label={ props.dropdownOptions.label } labelId={ props.dropdownOptions.labelId } id={ props.dropdownOptions.id } handleChange={ props.dropdownOptions.handleChange } value={ props.dropdownOptions.value } options={ props.dropdownOptions.options }/>
          <DatePicker format={ props.datepickerOptions.format } maxDate={ props.datepickerOptions.maxDate } minDate={ props.datepickerOptions.minDate } label={ props.datepickerOptions.label } handleChange={ props.datepickerOptions.handleChange } views={ props.datepickerOptions.views } value={ props.datepickerOptions.value }/>
        </div>
        <SimplePopover></SimplePopover>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
