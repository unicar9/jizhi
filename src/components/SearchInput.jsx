import React, { Component } from 'react'
import { Icon } from 'evergreen-ui'
import PropTypes from 'prop-types'

class SearchInput extends Component {
  render () {
    const { engineOption, value, focused, onFocus, onBlur, onChange } = this.props
    return (
      <form id='jizhi-search' action={engineOption.split('?')[0]} data-html2canvas-ignore>
        <Icon id='jizhi-search-icon' icon='search' size={16} />
        <input
          className={(focused || value) ? 'active' : null}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          name={engineOption.split('.')[1] === 'baidu' ? 'wd' : 'q'}
          autoComplete='off'
        />
      </form>
    )
  }
}

SearchInput.propTypes = {
  value: PropTypes.string,
  focused: PropTypes.bool,
  engineOption: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
}

export default SearchInput
