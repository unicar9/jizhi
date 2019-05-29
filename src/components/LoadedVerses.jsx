import React, { Component } from 'react'
import { Icon } from 'evergreen-ui'

export default class LoadedVerses extends Component {
  render () {
    const { content, origin } = this.props.verses
    return (
      <div className={`${this.props.className} verses`}>
        <div id='verses-content'>
          {content}
        </div>
        <div id='verses-origin'>
          <a href={`https://www.google.com/search?q=${origin.author} ${origin.title}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {origin.author} 《{origin.title}》
            <span className='origin-search-icon'>
              <Icon icon='search-text' color='black' />
            </span>
          </a>
        </div>
      </div>
    )
  }
}
