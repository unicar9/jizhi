import React, { Component } from 'react'
import { Icon } from 'evergreen-ui'
import PropTypes from 'prop-types'
import { VERTICAL } from '../constants/app-constants'
import { pureWords, cleanIdioms } from '../utils'

class HorizontalIdioms extends Component {
  render () {
    const {
      idioms: {
        // derivation,
        // example,
        explanation,
        // pinyin,
        word
        // abbreviation
      },
      engineOption,
      bgOption,
      versesLayout
    } = this.props

    const searchLink = `${engineOption}${word}`
    const classes = `verses ${bgOption} ${versesLayout}`
    const cleanedExplanation = cleanIdioms(explanation)
    const filteredContent = versesLayout === VERTICAL ? pureWords(cleanedExplanation) : cleanedExplanation
    // const pinyins = pinyin.split(' ')
    // const words = word.split('')
    // console.assert(pinyins.length == words.length)

    return (
      <div className={classes}>
        <div id='verses-content'>{word}</div>
        <a href={searchLink} target='_blank' rel='noopener noreferrer'>
          <div id='verses-origin'>
            <span className='explanation'>{`${filteredContent}`}</span>
            {/* <span className='stamp'>{author}</span> */}
            <span className='origin-search-icon'>
              <Icon icon='search-text' color='black' />
            </span>
          </div>
        </a>
      </div>
    )
  }
}

HorizontalIdioms.propTypes = {
  idioms: PropTypes.object,
  bgOption: PropTypes.string,
  versesLayout: PropTypes.string,
  engineOption: PropTypes.string
}

export default HorizontalIdioms
