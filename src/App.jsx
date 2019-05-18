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

    Storager.get(['selected'], res => {
      this.state = {
        isPlaying: true,
        defaultPlayChecked: true,
        colorStayChecked: false,
        selected: res.selected || 'waves'
      }
    })
  }

  componentDidMount () {
    console.log('ELe:', document.getElementById('defaultCanvas0'))

    Storager.get(['colorStayChecked'], res => {
      const isUntouched = res.colorStayChecked === undefined

      this.setState({
        colorStayChecked: isUntouched ? false : res.colorStayChecked
      })
    })

    Storager.get(['defaultPlayChecked'], res => {
      const isUntouched = res.defaultPlayChecked === undefined

      this.setState({
        defaultPlayChecked: isUntouched ? true : res.defaultPlayChecked,
        isPlaying: isUntouched ? true : res.defaultPlayChecked
      })
    })
  }

  onSaveSelect () {
    const node = document.getElementById('root')
    html2canvas(node).then(function (canvas) {
      const dataUrl = canvas.toDataURL('image/png')
      var link = document.createElement('a')
      link.download = 'jizhi.png'
      link.href = dataUrl
      link.click()
    })
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
      Storager.set({ defaultPlayChecked: this.state.defaultPlayChecked }, () => {})
    })
  }

  onColorStayChange () {
    this.setState({
      colorStayChecked: !this.state.colorStayChecked
    }, () => {
      Storager.set({ colorStayChecked: this.state.colorStayChecked }, () => {})
    })
  }

  onBgOptionChange (selected) {
    this.setState({ selected }, () => {
      Storager.set({ selected: this.state.selected }, () => {})
    })
  }

  render () {
    const { isPlaying, isDestroyed, defaultPlayChecked, colorStayChecked, selected } = this.state
    const sketches = { blobs: blobs, waves: waves }
    return (
      <div className='App'>
        <div id='color-name' className={colorStayChecked ? '' : 'fadeout'} />
        <LoadedVerses />
        <P5Wrapper ref={this.myRef} sketch={sketches[selected]} isPlaying={isPlaying} isDestroyed={isDestroyed} />
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
    )
  }
}

export default hot(module)(App)
