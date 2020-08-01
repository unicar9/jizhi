import React, { Component } from 'react'
import { Icon } from 'evergreen-ui'
import PropTypes from 'prop-types'
import { VERTICAL } from '../constants/app-constants'
import { pureWords, cleanIdioms, cleanExample } from '../utils'

class HorizontalIdioms extends Component {
  render () {
    const {
      idioms: {
        // derivation,
        example,
        explanation,
        pinyin,
        word
        // abbreviation
      },
      engineOption,
      bgOption,
      versesLayout
    } = this.props

    const searchLink = `${engineOption}${word}`
    const classes = `idioms ${bgOption} ${versesLayout}`
    const cleanedExplanation = cleanIdioms(explanation)
    const filteredContent = versesLayout === VERTICAL ? pureWords(cleanedExplanation) : cleanedExplanation
    const cleanedExample = cleanExample(example, word)
    const filteredExample = versesLayout === VERTICAL ? pureWords(cleanedExample) : cleanedExample

    return (
      <div className={classes}>
        <div id='pinyin'>{pinyin}</div>
        <div id='idioms-content'>{word}</div>
        <div id='idioms-origin'>
          <span className='explanation'>{`${filteredContent}`}</span>
          <span className='origin-search-icon'>
            <a href={searchLink} target='_blank' rel='noopener noreferrer'>
              <Icon icon='search-text' color='black' />
            </a>
          </span>
        </div>
        <div id='idioms-example'>
          {filteredExample}
        </div>
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
