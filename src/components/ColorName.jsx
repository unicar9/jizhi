import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  font-family: ${(props) => props.fontName};
  position: absolute;
  font-size: calc(100px + 5vw);
  right: 0;
  top: 0;
  color: ${(props) => (props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
  writing-mode: vertical-rl;
  white-space: nowrap;
  transform: translate(10%, -5%);
  ${(props) =>
    props.colorStayChecked
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
          animation: ${fadeOut} 5s ease;
        `};
`;

const ColorName = ({ colorName, colorStayChecked, fontName, isDarkMode }) => {
  return (
    <Wrapper fontName={fontName} colorStayChecked={colorStayChecked} isDarkMode={isDarkMode}>
      {colorName}
    </Wrapper>
  );
};

ColorName.propTypes = {
  colorName: PropTypes.string,
  colorStayChecked: PropTypes.bool,
  fontName: PropTypes.string,
  isDarkMode: PropTypes.bool,
};

export default ColorName;
