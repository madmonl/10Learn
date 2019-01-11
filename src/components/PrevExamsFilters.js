import React, { Component } from 'react'
import { TextField, FormControl, NativeSelect } from '@material-ui/core/';
import { dispatchChangeIdFilter, dispatchChangeSortByFilter } from '../actions/filters'
import { connect } from 'react-redux'
import { Search } from '@material-ui/icons';

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
    const { sortBy, sortByFilers } = this.props
    return (
      <div dir="rtl">
        <TextField
          dir="rtl"
          id="search"
          label={
            <Search className="mui-search"/>
          }
          type="search"
          margin="normal"
          onChange={this.onChange('ID')}
        />
        <FormControl className="mui-form">
          <NativeSelect
            native
            value={sortBy}
            onChange={this.onChange('sortBy')}
            inputProps={{
              name: 'age',
              id: 'age-native-simple',
            }}
          >
            {console.log(sortByFilers)}
            {
              sortByFilers.map(filter =>                 
                <option 
                  key={filter}
                  value={filter}
                >
                  {filter}
                </option>)
            }
          </NativeSelect> 
        </FormControl>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sortBy: state.filters.sortBy,
  sortByFilers: state.filters.sortByFilers
})

const mapDispatchToProps = (dispatch) => ({
  dispatchChangeIdFilter: (id) => dispatch(dispatchChangeIdFilter(id)),
  dispatchChangeSortByFilter: (sortBy) => dispatch(dispatchChangeSortByFilter(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(PrevExamsFilters)
