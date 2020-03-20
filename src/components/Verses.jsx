import React, { Component } from 'react'
import { Icon } from 'evergreen-ui'
import PropTypes from 'prop-types'
import { VERTICAL } from '../constants/app-constants'
import { pureWords } from '../utils'

class HorizontalVerses extends Component {
  render () {
    const {
      verses: {
        content,
        origin: {
          author,
          title
        }
      },
      engineOption,
      bgOption,
      versesLayout
    } = this.props

    const searchLink = `${engineOption}${author} ${title}`
    const classes = `verses ${bgOption} ${versesLayout}`
    const filteredContent = versesLayout === VERTICAL ? pureWords(content) : content

    return (
      <div className={classes}>
        <div id='verses-content'>{filteredContent}</div>
        <a href={searchLink} target='_blank' rel='noopener noreferrer'>
          <div id='verses-origin'>
            <span className='title'>{`「${title}」`}</span>
            <span className='stamp'>{author}</span>
            <span className='origin-search-icon'>
              <Icon icon='search-text' color='black' />
            </span>
          </div>
        </a>
      </div>
    )
  }
}

HorizontalVerses.propTypes = {
  verses: PropTypes.object,
  bgOption: PropTypes.string,
  versesLayout: PropTypes.string,
  engineOption: PropTypes.string
}

export default HorizontalVerses
