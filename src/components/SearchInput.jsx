import React, { Component } from 'react'
import { SearchInput as EgSearchInput } from 'evergreen-ui'

export default class SearchInput extends Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  render () {
    return (
      <div id='jizhi-search' data-html2canvas-ignore>
        <EgSearchInput />
      </div>
    )
  }
}
