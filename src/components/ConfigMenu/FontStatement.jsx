import React from 'react';
import { InlineAlert } from 'evergreen-ui';
import PropTypes from 'prop-types';
import { FONTS_INFO } from '../../constants/appConstants';

const FontStatement = ({ fontName }) => (
  <InlineAlert intent="none" marginBottom={-10} marginTop={10}>
    <a href={`${FONTS_INFO[fontName]['link']}`} target="_blank" rel="noopener noreferrer">
      点击查看关于{FONTS_INFO[fontName]['name']}的字体故事
    </a>
  </InlineAlert>
);

FontStatement.propTypes = {
  fontName: PropTypes.string,
};

export default FontStatement;
