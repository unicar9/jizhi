import { hot } from 'react-hot-loader'
import './App.css'
import React, { Component } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import waves from './sketchs/waves'
import blobs from './sketchs/blobs'
import LoadedVerses from './components/LoadedVerses'
import ConfigMenu from './components/ConfigMenu'
import html2canvas from 'html2canvas'
import Storager from './utils/storager'

class App extends Component {
  constructor (props) {
    super()
    this.onSaveSelect = this.onSaveSelect.bind(this)
    this.onPlayPauseSelect = this.onPlayPauseSelect.bind(this)
    this.onDefaultPlayChange = this.onDefaultPlayChange.bind(this)
    this.onColorStayChange = this.onColorStayChange.bind(this)
    this.onBgOptionChange = this.onBgOptionChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

    this.state = {
      isPlaying: true,
      defaultPlayChecked: true,
      colorStayChecked: false
    }
  }

  componentDidMount () {
    Storager.get(['selected', 'colorStayChecked', 'defaultPlayChecked'], res => {
      const isColorStayCheckedUntouched = res.colorStayChecked === undefined
      const isDefaultPlayCheckedUntouched = res.defaultPlayChecked === undefined

      this.setState({
        colorStayChecked: isColorStayCheckedUntouched ? false : res.colorStayChecked,
        defaultPlayChecked: isDefaultPlayCheckedUntouched ? true : res.defaultPlayChecked,
        isPlaying: isDefaultPlayCheckedUntouched ? true : res.defaultPlayChecked,
        selected: res.selected || 'waves'
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

    if (e.charCode === 115) {
      this.saveBg()
    }
  }

  render () {
    const { isPlaying, defaultPlayChecked, colorStayChecked, selected } = this.state
    const sketches = { blobs: blobs, waves: waves }

    return selected ? (
      <div className='App' tabIndex='-1' onKeyPress={this.handleKeyPress}>
        <div id='color-name' className={colorStayChecked ? '' : 'fadeout'} />
        <LoadedVerses className={selected} />
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
        />
      </div>
    ) : null
  }
}

export default hot(module)(App)
