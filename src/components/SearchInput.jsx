import React, { Component } from 'react'
import { Icon } from 'evergreen-ui'
import PropTypes from 'prop-types'

class SearchInput extends Component {
  render () {
    const { engineOption, value, focused, handleFocus, handleBlur, handleChange } = this.props
    return (
      <form id='jizhi-search' action={engineOption.split('?')[0]} data-html2canvas-ignore>
        <Icon id='jizhi-search-icon' icon='search' size={16} />
        <input
          className={(focused || value) ? 'active' : null}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          name={engineOption.split('.')[1] === 'baidu' ? 'wd' : 'q'}
        />
      </form>
    )
  }
}

SearchInput.propTypes = {
  value: PropTypes.string,
  focused: PropTypes.bool,
  engineOption: PropTypes.string,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func
}

export default SearchInput
