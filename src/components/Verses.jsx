import React, { Component } from 'react'
import { Icon } from 'evergreen-ui'
import PropTypes from 'prop-types'
import HorizontalVerses from './HorizontalVerses'
import VerticalVerses from './VerticalVerses'



class Verses extends Component {
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
      className,
      layout
    } = this.props

    const searchLink = `${engineOption}${origin.author} ${origin.title}`

    return layout === 'vertical' ?
      
    //   (
    //   <div className={`${className} verses`}>
    //     <div id='verses-content'>
    //       {content}
    //     </div>
    //     <div id='verses-origin'>
    //       <a href={searchLink} target='_blank' rel='noopener noreferrer'>
    //         {author} 「{title}」
    //         <span className='origin-search-icon'>
    //           <Icon icon='search-text' color='black' />
    //         </span>
    //       </a>
    //     </div>
    //   </div>
    // )
  }
}

Verses.propTypes = {
  verses: PropTypes.object,
  className: PropTypes.string,
  engineOption: PropTypes.string
}

export default Verses
