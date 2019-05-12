import { hot } from 'react-hot-loader'
import './App.css'
import React, { Component } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import waves from './sketchs/waves'
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

    this.state = {
      isPlaying: true,
      defaultPlayChecked: true,
      colorStayChecked: false
    }
  }

  componentDidMount () {
    Storager.get(['colorStayChecked'], res => {
      if (res.colorStayChecked === undefined) {
        this.setState({
          colorStayChecked: false
        })
      } else {
        this.setState({ colorStayChecked: res.colorStayChecked }, () => {})
      }
    })

    Storager.get(['defaultPlayChecked'], res => {
      if (res.defaultPlayChecked === undefined) {
        this.setState({
          defaultPlayChecked: true,
          isPlaying: true
        })
      } else {
        this.setState({ defaultPlayChecked: res.defaultPlayChecked, isPlaying: res.defaultPlayChecked }, () => {})
      }
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

  render () {
    const { isPlaying, defaultPlayChecked, colorStayChecked } = this.state
    return (
      <div className='App'>
        <div id='color-name' className={colorStayChecked ? '' : 'fadeout'} />
        <LoadedVerses />
        <P5Wrapper sketch={waves} isPlaying={isPlaying} />
        <ConfigMenu
          onSaveSelect={this.onSaveSelect}
          onPlayPauseSelect={this.onPlayPauseSelect}
          isPlaying={isPlaying}
          defaultPlayChecked={defaultPlayChecked}
          onDefaultPlayChange={this.onDefaultPlayChange}
          colorStayChecked={colorStayChecked}
          onColorStayChange={this.onColorStayChange}
        />
      </div>
    )
  }
}

export default hot(module)(App)
