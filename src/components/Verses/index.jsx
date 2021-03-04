import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { WAVES } from '../../constants/appConstants';
import VersesContent from './VersesContent';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
`;

const VersesWrapper = styled.div`
  color: ${(props) => (props.isDarkMode ? '#fff' : '#111')};
  font-family: ${(props) => props.fontName};
  top: ${(props) => (props.isWaves ? '30vh' : '45vh')};
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50vw;
  text-align: center;
  opacity: 0.8;
  word-break: keep-all;
`;

const HorizontalVersesWrapper = styled(VersesWrapper)`
  transition: top 500ms ease-in-out;
  animation: ${fadeIn} 1s ease-in;
`;

const VerticalVersesWrapper = styled(VersesWrapper)`
  text-align: left;
  top: 40vh;
  transform: translate(-50%, -50%);
  writing-mode: vertical-rl;
  animation: ${fadeIn} 500ms ease-in;
`;

const Verses = (props) => {
  const { verses, engineOption, bgOption, isVerticalVerses, fontName, isDarkMode } = props;

  return !isVerticalVerses ? (
    <HorizontalVersesWrapper
      isDarkMode={isDarkMode}
      fontName={fontName}
      isWaves={bgOption === WAVES}
    >
      <VersesContent
        verses={verses}
        bgOption={bgOption}
        engineOption={engineOption}
        isVertical={isVerticalVerses}
      />
    </HorizontalVersesWrapper>
  ) : (
    <VerticalVersesWrapper isDarkMode={isDarkMode} fontName={fontName} isWaves={bgOption === WAVES}>
      <VersesContent
        verses={verses}
        bgOption={bgOption}
        engineOption={engineOption}
        isVertical={isVerticalVerses}
      />
    </VerticalVersesWrapper>
  );
};

Verses.propTypes = {
  verses: PropTypes.object,
  bgOption: PropTypes.string,
  isVerticalVerses: PropTypes.bool,
  engineOption: PropTypes.string,
  fontName: PropTypes.string,
  isDarkMode: PropTypes.bool,
};

export default Verses;
