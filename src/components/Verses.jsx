import React, { Component } from 'react';
import { Icon } from 'evergreen-ui';
import PropTypes from 'prop-types';
import { VERTICAL } from '../constants/app-constants';
import { pureWords } from '../utils';

class HorizontalVerses extends Component {
  render() {
    const {
      verses: {
        content,
        origin: { author, title },
      },
      engineOption,
      bgOption,
      versesLayout,
    } = this.props;

    const searchLink = `${engineOption}${author} ${title}`;
    const classes = `verses ${bgOption} ${versesLayout}`;
    const filteredContent = versesLayout === VERTICAL ? pureWords(content) : content;

    return (
      <div id="verse-wrapper" className={classes}>
        <div id="verses-content">{filteredContent}</div>
        <div id="verses-origin">
          <a href={searchLink} target="_blank" rel="noopener noreferrer">
            <span className="title">{`「${title}」`}</span>
          </a>
          <span className="stamp">{author}</span>
          <span className="origin-search-icon">
            <Icon size={14} icon="search-text" color="black" />
          </span>
        </div>
      </div>
    );
  }
}

HorizontalVerses.propTypes = {
  verses: PropTypes.object,
  bgOption: PropTypes.string,
  versesLayout: PropTypes.string,
  engineOption: PropTypes.string,
};

export default HorizontalVerses;
