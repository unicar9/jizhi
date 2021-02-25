import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import P5Wrapper from 'react-p5-wrapper';
import { InlineAlert } from 'evergreen-ui';
import waves from './sketchs/waves';
import blobs from './sketchs/blobs';
import Verses from './components/Verses';
import ConfigMenu from './components/ConfigMenu';
import SearchInput from './components/SearchInput';
import { saveBackground, insertFont, fetchAndSetFont, setFont } from './utils';
import Storager from './utils/storager';
import { load } from './utils/jinrishici';
import {
  HORIZONTAL,
  VERTICAL,
  WAVES,
  GOOGLE_SEARCH,
  DEFAULT_SHICI,
  DEFAULT_FONT,
} from './constants/app-constants';

import './styles/app.scss';

const DEFAULT_SHICI_LIST = require('./constants/shici.json');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: true,
      showSearchBarChecked: false,
      defaultPlayChecked: true,
      colorStayChecked: false,
      verses: DEFAULT_SHICI,
      versesLayout: HORIZONTAL,
      errMessage: '',
      engineOption: GOOGLE_SEARCH,
      value: '',
      focused: false,
      fontName: DEFAULT_FONT,
    };
  }

  componentDidMount() {
    load(
      (result) => {
        Storager.set({ verses: result.data });
      },
      (err) => {
        this.setState({ errMessage: err.errMessage });
        const localShici =
          DEFAULT_SHICI_LIST[Math.floor(Math.random() * DEFAULT_SHICI_LIST.length)];
        Storager.set({ verses: localShici });
      }
    );

    Storager.get(
      [
        'verses',
        'versesLayout',
        'selected',
        'colorStayChecked',
        'defaultPlayChecked',
        'engineOption',
        'showSearchBarChecked',
        'fontName',
        'fonts',
      ],
      (res) => {
        if (res.fonts && res.fontName === res.fonts.fontName) {
          insertFont(res.fontName, res.fonts.value);
        }

        this.setState({
          showSearchBarChecked: !!res.showSearchBarChecked,
          colorStayChecked: !!res.colorStayChecked,
          defaultPlayChecked: res.defaultPlayChecked !== false,
          isVerticalVerses: res.versesLayout === VERTICAL,
          isPlaying: res.defaultPlayChecked !== false,
          verses: res.verses || DEFAULT_SHICI,
          selected: res.selected || WAVES,
          engineOption: res.engineOption || GOOGLE_SEARCH,
          fontName: res.fontName || DEFAULT_FONT,
        });

        if (res.fonts && res.fonts.fontName == fontName) {
          insertFont(fontName, res.fonts.value);
          setFontFamily(fontName, 'verse-wrapper');
        }
      }
    );
  }

  handlePlayPauseSelect = () => this.setState((state) => ({ isPlaying: !state.isPlaying }));

  handleShowSearchBarChange = () => {
    this.setState(
      (state) => ({
        showSearchBarChecked: !state.showSearchBarChecked,
      }),
      () => {
        Storager.set({ showSearchBarChecked: this.state.showSearchBarChecked });
      }
    );
  };

  handleVersesLayoutChange = () => {
    const { isVerticalVerses } = this.state;

    this.setState(
      (state) => ({
        isVerticalVerses: !state.isVerticalVerses,
      }),
      () => {
        Storager.set({
          versesLayout: isVerticalVerses ? VERTICAL : HORIZONTAL,
        });
      }
    );
  };

  handleDefaultPlayChange = () => {
    const { defaultPlayChecked } = this.state;
    this.setState(
      (state) => ({
        defaultPlayChecked: !state.defaultPlayChecked,
      }),
      () => {
        Storager.set({ defaultPlayChecked });
      }
    );
  };

  handleColorStayChange = () => {
    this.setState(
      (state) => ({
        colorStayChecked: !state.colorStayChecked,
      }),
      () => {
        Storager.set({ colorStayChecked: this.state.colorStayChecked });
      }
    );
  };

  handleBgOptionChange = (selected) => {
    this.setState({ selected }, () => {
      Storager.set({ selected });
    });
  };

  handleKeyPress = ({ charCode, altKey }) => {
    // space
    if (charCode === 32) this.setState((state) => ({ isPlaying: !state.isPlaying }));
    // S + alt
    if (charCode === 223 && altKey) saveBackground();
  };

  handleFontTypeChange = (fontName) => {
    if (fontName === DEFAULT_FONT) {
      setFont(fontName);
    } else {
      Storager.get(['fonts'], (res) => {
        if (res.fonts && res.fonts.fontName === fontName) {
          insertFont(fontName, res.fonts.value);
        } else {
          fetchAndSetFont(fontName);
        }
      });
    }

    this.setState({ fontName }, () => Storager.set({ fontName }));
    if (fontName == DEFAULT_FONT) {
      setFontFamily(fontName, 'verse-wrapper');
    } else {
      fetchAndStoreFont(fontName, 'verse-wrapper');
    }
  };

  handleEngineOptionChange = (engineOption) =>
    this.setState({ engineOption }, () => Storager.set({ engineOption }));

  handleChange = ({ target: { value } }) => this.setState({ value });

  handleFocus = () => this.setState({ focused: true });

  handleBlur = () => this.setState({ focused: false });

  render() {
    const {
      verses,
      isVerticalVerses,
      isPlaying,
      showSearchBarChecked,
      defaultPlayChecked,
      colorStayChecked,
      selected,
      errMessage,
      engineOption,
      value,
      focused,
      fontName,
    } = this.state;
    const sketches = { blobs, waves };

    return selected ? (
      <div className="App" tabIndex="-1" onKeyPress={this.handleKeyPress}>
        {selected === WAVES && (
          <div id="color-name" className={colorStayChecked ? '' : 'fadeout'} />
        )}
        <Verses
          bgOption={selected}
          verses={verses}
          versesLayout={isVerticalVerses ? VERTICAL : HORIZONTAL}
          engineOption={engineOption}
        />
        <P5Wrapper sketch={sketches[selected]} isPlaying={isPlaying} />
        <ConfigMenu
          onPlayPauseSelect={this.handlePlayPauseSelect}
          isPlaying={isPlaying}
          isVerticalVerses={isVerticalVerses}
          showSearchBarChecked={showSearchBarChecked}
          onShowSearchBarChange={this.handleShowSearchBarChange}
          defaultPlayChecked={defaultPlayChecked}
          onDefaultPlayChange={this.handleDefaultPlayChange}
          onVersesLayoutChange={this.handleVersesLayoutChange}
          colorStayChecked={colorStayChecked}
          onColorStayChange={this.handleColorStayChange}
          selected={selected}
          onBgOptionChange={this.handleBgOptionChange}
          engineOption={engineOption}
          onEngineOptionChange={this.handleEngineOptionChange}
          fontName={fontName}
          onFontTypeChange={this.handleFontTypeChange}
        >
          {errMessage && (
            <div style={{ height: 30 }}>
              <InlineAlert intent="warning" marginLeft={20} marginRight={20}>
                {errMessage}
              </InlineAlert>
            </div>
          )}
        </ConfigMenu>
        {showSearchBarChecked && (
          <SearchInput
            value={value}
            focused={focused}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            engineOption={engineOption}
          />
        )}
      </div>
    ) : null;
  }
}

export default hot(module)(App);
