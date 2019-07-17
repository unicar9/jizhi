import React, { Component } from 'react'
import { Icon } from 'evergreen-ui'
import PropTypes from 'prop-types'

class VerticalVerses extends Component {
  render () {
    const {
      verses: {
        content,
        origin
      },
      engineOption,
      className
    } = this.props

    return (
      <div className={`${className} verses`}>
        <div id='verses-content'>
          {content}
        </div>
        <div id='verses-origin'>
          <a href={`${engineOption}${origin.author} ${origin.title}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {origin.author} 「{origin.title}」
            <span className='origin-search-icon'>
              <Icon icon='search-text' color='black' />
            </span>
          </a>
        </div>
      </div>
    )
  }
}

VerticalVerses.propTypes = {
  verses: PropTypes.object,
  className: PropTypes.string,
  engineOption: PropTypes.string
}

export default VerticalVerses
