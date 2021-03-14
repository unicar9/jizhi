import { createGlobalStyle } from 'styled-components';
import JXZhuoKai from '../fonts/JXZhuoKai.woff';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'JXZhuoKai';
    src: url(${JXZhuoKai}) format('woff');
  }

  html,
  body {
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: 'JXZhuoKai';
    height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
