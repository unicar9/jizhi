import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import P5Wrapper from 'react-p5-wrapper'
import waves from './sketchs/waves'
import blobs from './sketchs/blobs'
import LoadedVerses from './components/LoadedVerses'
import ConfigMenu from './components/ConfigMenu'
import SearchInput from './components/SearchInput'
import html2canvas from 'html2canvas'
import Storager from './utils/storager'
import { InlineAlert } from 'evergreen-ui'
import { load } from './utils/jinrishici'

import './styles/app.scss'

const DEFAULT_SHICI_LIST = require('./constants/shici.json')
const GOOGLE_SEARCH = 'https://www.google.com/search?q='
const initialShici = {
  content: '红豆生南国，春来发几枝。',
  origin: {
    author: '王维',
    title: '相思'
  }
}

class App extends Component {
  constructor (props) {
    super()

    this.state = {
      isPlaying: true,
      showSearchBarChecked: false,
      defaultPlayChecked: true,
      colorStayChecked: false,
      verses: initialShici,
      errMessage: '',
      engineOption: GOOGLE_SEARCH,
      value: '',
      focused: false
    }
  }

  componentDidMount () {
    load(result => {
      Storager.set({ verses: result.data })
    }, err => {
      this.setState({ errMessage: err.errMessage })
      const localShici = DEFAULT_SHICI_LIST[Math.floor(Math.random() * DEFAULT_SHICI_LIST.length)]
      Storager.set({ verses: localShici })
    })

    Storager.get(['verses', 'selected', 'colorStayChecked', 'defaultPlayChecked', 'engineOption', 'showSearchBarChecked'], res => {
      this.setState({
        showSearchBarChecked: !!res.showSearchBarChecked,
        colorStayChecked: !!res.colorStayChecked,
        defaultPlayChecked: res.defaultPlayChecked !== false,
        isPlaying: res.defaultPlayChecked !== false,
        selected: res.selected || 'waves',
        verses: res.verses || initialShici,
        engineOption: res.engineOption || GOOGLE_SEARCH
      })
    })
  }

  saveBg () {
    const node = document.getElementById('root')
    html2canvas(node).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png')
      var link = document.createElement('a')
      link.download = 'jizhi.png'
      link.href = dataUrl
      link.click()
    })
  }

  onSaveSelect = () => this.saveBg()

  onPlayPauseSelect = () => this.setState({ isPlaying: !this.state.isPlaying })

  onShowSearchBarChange = () => {
    this.setState({
      showSearchBarChecked: !this.state.showSearchBarChecked
    }, () => {
      Storager.set({ showSearchBarChecked: this.state.showSearchBarChecked })
    })
  }

  onDefaultPlayChange = () => {
    this.setState({
      defaultPlayChecked: !this.state.defaultPlayChecked
    }, () => {
      Storager.set({ defaultPlayChecked: this.state.defaultPlayChecked })
    })
  }

  onColorStayChange = () => {
    this.setState({
      colorStayChecked: !this.state.colorStayChecked
    }, () => {
      Storager.set({ colorStayChecked: this.state.colorStayChecked })
    })
  }

  onBgOptionChange = (selected) => {
    this.setState({ selected }, () => {
      Storager.set({ selected })
    })
  }

  handleKeyPress = ({ charCode, altKey }) => {
    // space
    if (charCode === 32) this.setState({ isPlaying: !this.state.isPlaying })
    // S + alt
    if (charCode === 223 && altKey) this.saveBg()
  }

  onEngineOptionChange = engineOption => this.setState({ engineOption }, () => Storager.set({ engineOption }))

  handleChange = ({ target: { value } }) => this.setState({ value })

  handleFocus = () => this.setState({ focused: true })

  handleBlur = () => this.setState({ focused: false })

  render () {
    const { verses, isPlaying, showSearchBarChecked, defaultPlayChecked, colorStayChecked, selected, errMessage, engineOption, value, focused } = this.state
    const sketches = { blobs, waves }

    return selected ? (
      <div className='App' tabIndex='-1' onKeyPress={this.handleKeyPress}>
        {selected === 'waves' && <div id='color-name' className={colorStayChecked ? '' : 'fadeout'} />}
        <LoadedVerses className={selected} verses={verses} engineOption={engineOption} />
        <P5Wrapper sketch={sketches[selected]} isPlaying={isPlaying} />
        <ConfigMenu
          onSaveSelect={this.onSaveSelect}
          onPlayPauseSelect={this.onPlayPauseSelect}
          isPlaying={isPlaying}
          showSearchBarChecked={showSearchBarChecked}
          onShowSearchBarChange={this.onShowSearchBarChange}
          defaultPlayChecked={defaultPlayChecked}
          onDefaultPlayChange={this.onDefaultPlayChange}
          colorStayChecked={colorStayChecked}
          onColorStayChange={this.onColorStayChange}
          selected={selected}
          onBgOptionChange={this.onBgOptionChange}
          engineOption={engineOption}
          onEngineOptionChange={this.onEngineOptionChange}
        >
          {errMessage && <div style={{ height: 30 }}>
            <InlineAlert intent='warning' marginLeft={20} marginRight={20}>
              {errMessage}
            </InlineAlert>
          </div>}
        </ConfigMenu>
        {showSearchBarChecked &&
          <SearchInput
            value={value}
            focused={focused}
            handleFocus={this.handleFocus}
            handleBlur={this.handleBlur}
            handleChange={this.handleChange}
            engineOption={engineOption}
          />
        }
      </div>
    ) : null
  }
}

export default hot(module)(App)
