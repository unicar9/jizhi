import domtoimage from 'retina-dom-to-image';
import axios from 'axios';
import { sample } from 'lodash';
import wavesColors from '../constants/wavesColors.json';
import storager from './storager';

export const filter = (node) => {
  return node.id !== 'menu-button' && node.id !== 'jizhi-search-icon';
};

export const isDarkModeEnabled = () => {
  const result = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return result;
};

export const saveBackground = () => {
  const node = document.getElementById('root');
  const githubLink = 'https://github.com/unicar9/jizhi/issues';
  domtoimage
    .toPng(node, { filter })
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'jizhi.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error(`截图失败，联系我们: ${githubLink}`, error);
    });
};

/*
    filter out Chinese chars:
    。  \u3002
    ，  \uff0c
    、  \u3001
    ？  \uff1f
    ！  \uff01
*/
export const pureWords = (sentense = '') => {
  const regex = /[\u3002|\uff0c|\u3001|\uff1f|\uff01]/gi;
  return sentense.replace(regex, ' ');
};

export const insertFont = (data) => {
  const style = document.createElement('style');
  style.textContent = data;
  document.head.appendChild(style);
};

export const fetchAndSetFont = async (fontName) => {
  const WEB_FONT_URL = `https://romantic-bell-b49acd.netlify.app/${fontName}.woff.json`;

  return new Promise((resolve, reject) => {
    axios
      .get(WEB_FONT_URL, { crossdomain: true })
      .then((res) => {
        insertFont(res.data.value);
        storager.set({ fonts: res.data });
        return resolve(res.data);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const pickColor = (isDarkMode) => {
  const suitableColors = isDarkMode
    ? wavesColors.filter((c) => c.darkSuitable)
    : wavesColors.filter((c) => c.lightSuitable);

  return sample(suitableColors);
};
