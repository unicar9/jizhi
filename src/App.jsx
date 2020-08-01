import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import P5Wrapper from 'react-p5-wrapper'
import waves from './sketchs/waves'
import blobs from './sketchs/blobs'
import Verses from './components/Verses'
import Idioms from './components/Idioms'
import ConfigMenu from './components/ConfigMenu'
import SearchInput from './components/SearchInput'
import { saveBackground } from './utils'
import Storager from './utils/storager'
import { InlineAlert } from 'evergreen-ui'
import { load as shiciLoad } from './utils/jinrishici'
import { load as idiomLoad } from './utils/idiom'
import { HORIZONTAL, VERTICAL, WAVES, GOOGLE_SEARCH, DEFAULT_SHICI, DEFAULT_IDIOM } from './constants/app-constants'

import './styles/app.scss'

const DEFAULT_SHICI_LIST = require('./constants/shici.json')
const DEFAULT_IDIOM_LIST = require('./constants/idiom.json')

class App extends Component {
  constructor (props) {
    super()

    this.state = {
      isShici: true,
      isPlaying: true,
      showSearchBarChecked: false,
      defaultPlayChecked: true,
      colorStayChecked: false,
      verses: DEFAULT_SHICI,
      versesLayout: HORIZONTAL,
      errMessage: '',
      engineOption: GOOGLE_SEARCH,
      value: '',
      focused: false
    }
  }

  componentDidMount () {
    shiciLoad(result => {
      Storager.set({ verses: result.data })
    }, err => {
      this.setState({ errMessage: err.errMessage })
      const localShici = DEFAULT_SHICI_LIST[Math.floor(Math.random() * DEFAULT_SHICI_LIST.length)]
      Storager.set({ verses: localShici })
    })
    idiomLoad(data => {
      Storager.set({ idioms: data })
    }, err => {
      this.setState({ errMessage: err.errMessage })
      const localIdiom = DEFAULT_IDIOM_LIST[Math.floor(Math.random() * DEFAULT_IDIOM_LIST.length)]
      Storager.set({ idioms: localIdiom })
    })
    Storager.get(['verses', 'idioms', 'versesLayout', 'selected', 'colorStayChecked', 'defaultPlayChecked', 'engineOption', 'showSearchBarChecked', 'isShici'], res => {
      this.setState({
        showSearchBarChecked: !!res.showSearchBarChecked,
        colorStayChecked: !!res.colorStayChecked,
        defaultPlayChecked: res.defaultPlayChecked !== false,
        isVerticalVerses: res.versesLayout === VERTICAL,
        isPlaying: res.defaultPlayChecked !== false,
        verses: res.verses || DEFAULT_SHICI,
        idioms: res.idioms || DEFAULT_IDIOM,
        selected: res.selected || WAVES,
        engineOption: res.engineOption || GOOGLE_SEARCH,
        isShici: !!res.isShici
      })
    })
  }

  handlePlayPauseSelect = () => this.setState({ isPlaying: !this.state.isPlaying })

  handleShowSearchBarChange = () => {
    this.setState({
      showSearchBarChecked: !this.state.showSearchBarChecked
    }, () => {
      Storager.set({ showSearchBarChecked: this.state.showSearchBarChecked })
    })
  }

  handleVersesLayoutChange = () => {
    this.setState({
      isVerticalVerses: !this.state.isVerticalVerses
    }, () => {
      Storager.set({ versesLayout: this.state.isVerticalVerses ? VERTICAL : HORIZONTAL })
    })
  }

  handleDefaultPlayChange = () => {
    this.setState({
      defaultPlayChecked: !this.state.defaultPlayChecked
    }, () => {
      Storager.set({ defaultPlayChecked: this.state.defaultPlayChecked })
    })
  }

  handleColorStayChange = () => {
    this.setState({
      colorStayChecked: !this.state.colorStayChecked
    }, () => {
      Storager.set({ colorStayChecked: this.state.colorStayChecked })
    })
  }

  handleDisplayShiciChange = () => {
    this.setState({
      isShici: !this.state.isShici
    }, () => {
      Storager.set({ isShici: this.state.isShici })
    })
  }

  handleBgOptionChange = selected => {
    this.setState({ selected }, () => {
      Storager.set({ selected })
    })
  }

  handleKeyPress = ({ charCode, altKey }) => {
    // space
    if (charCode === 32) this.setState({ isPlaying: !this.state.isPlaying })
    // S + alt
    if (charCode === 223 && altKey) saveBackground()
  }

  handleEngineOptionChange = engineOption => this.setState({ engineOption }, () => Storager.set({ engineOption }))

  handleChange = ({ target: { value } }) => this.setState({ value })

  handleFocus = () => this.setState({ focused: true })

  handleBlur = () => this.setState({ focused: false })

  render () {
    const { verses, idioms, isVerticalVerses, isShici, isPlaying, showSearchBarChecked, defaultPlayChecked, colorStayChecked, selected, errMessage, engineOption, value, focused } = this.state
    const sketches = { blobs, waves }

    return selected ? (
      <div className='App' tabIndex='-1' onKeyPress={this.handleKeyPress}>
        {selected === WAVES && <div id='color-name' className={colorStayChecked ? '' : 'fadeout'} />}
        {isShici &&
          <Verses
            bgOption={selected}
            verses={verses}
            versesLayout={isVerticalVerses ? VERTICAL : HORIZONTAL}
            engineOption={engineOption}
          />}
        {!isShici &&
          <Idioms
            bgOption={selected}
            idioms={idioms}
            idiomsLayout={isVerticalVerses ? VERTICAL : HORIZONTAL}
            engineOption={engineOption}
          />}
        <P5Wrapper sketch={sketches[selected]} isPlaying={isPlaying} />
        <ConfigMenu
          onPlayPauseSelect={this.handlePlayPauseSelect}
          isShici={isShici}
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
          onDisplayShiciChange={this.handleDisplayShiciChange}
        >
          {errMessage &&
            <div style={{ height: 30 }}>
              <InlineAlert intent='warning' marginLeft={20} marginRight={20}>
                {errMessage}
              </InlineAlert>
            </div>}
        </ConfigMenu>
        {showSearchBarChecked &&
          <SearchInput
            value={value}
            focused={focused}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            engineOption={engineOption}
          />}
      </div>
    ) : null
  }
}

export default hot(module)(App)
