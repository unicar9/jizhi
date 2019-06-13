import React, { Component } from 'react'
import { Icon } from 'evergreen-ui'

export default class SearchInput extends Component {
  constructor (props) {
    super(props)
    this.state = { value: '', focused: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  handleFocus () {
    this.setState({ focused: true })
  }

  handleBlur () {
    this.setState({ focused: false })
  }

  render () {
    const { value, focused } = this.state
    const { engineOption } = this.props
    return (
      <form id='jizhi-search' action={engineOption.split('?')[0]} data-html2canvas-ignore>
        <Icon id='jizhi-search-icon' icon='search' size={16} />
        <input
          className={(focused || value) ? 'active' : null}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          name={engineOption.split('.')[1] === 'baidu' ? 'wd' : 'q'}
        />
      </form>
    )
  }
}
