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

let shici = require('./utils/shici.json')
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
    this.onSaveSelect = this.onSaveSelect.bind(this)
    this.onPlayPauseSelect = this.onPlayPauseSelect.bind(this)
    this.onShowSearchBarChange = this.onShowSearchBarChange.bind(this)
    this.onDefaultPlayChange = this.onDefaultPlayChange.bind(this)
    this.onColorStayChange = this.onColorStayChange.bind(this)
    this.onBgOptionChange = this.onBgOptionChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onEngineOptionChange = this.onEngineOptionChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

    this.state = {
      isPlaying: true,
      showSearchBarChecked: false,
      defaultPlayChecked: true,
      colorStayChecked: false,
      verses: initialShici,
      errMessage: '',
      engineOption: 'https://www.google.com/search?q=',
      value: '',
      focused: false
    }
  }

  componentDidMount () {
    load(result => {
      Storager.set({ verses: result.data })
    }, result => {
      this.setState({ errMessage: result.errMessage })
      const localShici = shici[Math.floor(Math.random() * shici.length)]
      Storager.set({ verses: localShici })
    })

    Storager.get(['verses', 'selected', 'colorStayChecked', 'defaultPlayChecked', 'engineOption', 'showSearchBarChecked'], res => {
      const isColorStayCheckedUntouched = res.colorStayChecked === undefined
      const isDefaultPlayCheckedUntouched = res.defaultPlayChecked === undefined
      const isShowSearchBarCheckedUntouched = res.showSearchBarChecked === undefined

      this.setState({
        showSearchBarChecked: isShowSearchBarCheckedUntouched ? false : res.showSearchBarChecked,
        colorStayChecked: isColorStayCheckedUntouched ? false : res.colorStayChecked,
        defaultPlayChecked: isDefaultPlayCheckedUntouched ? true : res.defaultPlayChecked,
        isPlaying: isDefaultPlayCheckedUntouched ? true : res.defaultPlayChecked,
        selected: res.selected || 'waves',
        verses: res.verses || initialShici,
        engineOption: res.engineOption || 'https://www.google.com/search?q='
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

  onSaveSelect () {
    this.saveBg()
  }

  onPlayPauseSelect () {
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  onShowSearchBarChange () {
    this.setState({
      showSearchBarChecked: !this.state.showSearchBarChecked
    }, () => {
      Storager.set({ showSearchBarChecked: this.state.showSearchBarChecked })
    })
  }

  onDefaultPlayChange () {
    this.setState({
      defaultPlayChecked: !this.state.defaultPlayChecked
    }, () => {
      Storager.set({ defaultPlayChecked: this.state.defaultPlayChecked })
    })
  }

  onColorStayChange () {
    this.setState({
      colorStayChecked: !this.state.colorStayChecked
    }, () => {
      Storager.set({ colorStayChecked: this.state.colorStayChecked })
    })
  }

  onBgOptionChange (selected) {
    this.setState({ selected }, () => {
      Storager.set({ selected })
    })
  }

  handleKeyPress (e) {
    if (e.charCode === 32) {
      this.setState({
        isPlaying: !this.state.isPlaying
      })
    }

    if (e.charCode === 223 && e.altKey) {
      this.saveBg()
    }
  }

  onEngineOptionChange (engineOption) {
    this.setState({ engineOption }, () => {
      Storager.set({ engineOption })
    })
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  handleFocus () {
    this.setState({ focused: true })
  }

  handleBlur () {
    this.setState({ focused: false })
  }

  render () {
    const { verses, isPlaying, showSearchBarChecked, defaultPlayChecked, colorStayChecked, selected, errMessage, engineOption, value, focused } = this.state
    const sketches = { blobs: blobs, waves: waves }

    return selected ? (
      <div className='App' tabIndex='-1' onKeyPress={this.handleKeyPress}>
        <div id='color-name' style={{ display: selected === 'blobs' ? 'none' : 'block' }} className={colorStayChecked ? '' : 'fadeout'} />
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
