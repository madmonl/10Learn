import React, { Component } from 'react'
import { TextField, FormControl, InputLabel, Select } from '@material-ui/core/';
import { dispatchChangeIdFilter, dispatchChangeSortByFilter } from '../actions/filters'
import { connect } from 'react-redux'

export class PrevExamsFilters extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange = name => e => {
    name === 'ID' 
      ? this.props.dispatchChangeIdFilter(e.target.value)
      : this.props.dispatchChangeSortByFilter(e.target.value)
  }
  
  render() {
    return (
      <div dir="rtl">
        <TextField
          dir="rtl"
          id="search"
          label="חיפוש"
          type="search"
          margin="normal"
          onChange={this.onChange('ID')}
        />
        <FormControl>
          <Select
            native
            value={this.state.age}
            onChange={this.onChange('sortBy')}
            inputProps={{
              name: 'age',
              id: 'age-native-simple',
            }}
          >
            <option value={"ציון גבוה קודם"}>ציון גבוה קודם</option>
            <option value={"ציון נמוך קודם"}>ציון נמוך קודם</option>
            <option value={"תאריך"}>תאריך</option>
          </Select> 
        </FormControl>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  text: state.filters.text
})

const mapDispatchToProps = (dispatch) => ({
  dispatchChangeIdFilter: (id) => dispatch(dispatchChangeIdFilter(id)),
  dispatchChangeSortByFilter: (sortBy) => dispatch(dispatchChangeSortByFilter(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(PrevExamsFilters)
