import React from 'react'
import { Icon } from 'evergreen-ui'
import { string, bool, func } from 'prop-types'

const SearchInput = ({ engineOption, value, focused, handleFocus, handleBlur, handleChange }) => (
  <form id='jizhi-search' action={engineOption.split('?')[0]} data-html2canvas-ignore>
    <Icon id='jizhi-search-icon' icon='search' size={16} />
    <input
      className={(focused || value) ? 'active' : null}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      name={engineOption.split('.')[1] === 'baidu' ? 'wd' : 'q'}
      autocomplete='off'
    />
  </form>
)

SearchInput.propTypes = {
  value: string,
  focused: bool,
  engineOption: string,
  handleFocus: func,
  handleBlur: func,
  handleChange: func
}

export default SearchInput
