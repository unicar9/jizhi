import domtoimage from 'retina-dom-to-image';
import axios from 'axios';
import storager from './storager';

function filter(node) {
  return node.id !== 'menu';
}

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

export const setFont = (fontName) => {
  document.querySelector('body').style.setProperty('--font-name', fontName);
};

export const insertFont = (fontName, data) => {
  const style = document.createElement('style');
  style.innerHTML = data;
  document.head.appendChild(style);

  setFont(fontName);
};

export const fetchAndSetFont = async (fontName) => {
  const WEB_FONT_URL = `https://romantic-bell-b49acd.netlify.app/${fontName}.woff.json`;

  try {
    const res = await axios.get(WEB_FONT_URL, { crossdomain: true });
    insertFont(res.data.fontName, res.data.value);
    storager.set({ fonts: res.data });
  } catch (error) {
    console.log(error);
  }
};
