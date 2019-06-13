import { hot } from 'react-hot-loader'
import './App.css'
import React, { Component } from 'react'
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

let shici = require('./utils/shici.json')

class App extends Component {
  constructor (props) {
    super()
    this.onSaveSelect = this.onSaveSelect.bind(this)
    this.onPlayPauseSelect = this.onPlayPauseSelect.bind(this)
    this.onDefaultPlayChange = this.onDefaultPlayChange.bind(this)
    this.onColorStayChange = this.onColorStayChange.bind(this)
    this.onBgOptionChange = this.onBgOptionChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onEngineOptionChange = this.onEngineOptionChange.bind(this)

    this.state = {
      isPlaying: true,
      defaultPlayChecked: true,
      colorStayChecked: false,
      verses: {
        content: '红豆生南国，春来发几枝。',
        origin: {
          author: '王维',
          title: '相思'
        }
      },
      errMessage: '',
      engineOption: 'https://www.google.com/search?q='
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

    Storager.get(['verses', 'selected', 'colorStayChecked', 'defaultPlayChecked'], res => {
      const isColorStayCheckedUntouched = res.colorStayChecked === undefined
      const isDefaultPlayCheckedUntouched = res.defaultPlayChecked === undefined

      this.setState({
        colorStayChecked: isColorStayCheckedUntouched ? false : res.colorStayChecked,
        defaultPlayChecked: isDefaultPlayCheckedUntouched ? true : res.defaultPlayChecked,
        isPlaying: isDefaultPlayCheckedUntouched ? true : res.defaultPlayChecked,
        selected: res.selected || 'waves',
        verses: res.verses
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
    this.setState({ engineOption })
  }

  render () {
    const { verses, isPlaying, defaultPlayChecked, colorStayChecked, selected, errMessage, engineOption } = this.state
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
        <SearchInput />
      </div>
    ) : null
  }
}

export default hot(module)(App)
