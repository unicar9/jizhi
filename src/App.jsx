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
    Storager.get(['colorStayChecked', 'defaultPlayChecked'], res => {
      console.log(res)
      const isColorStayCheckedUntouched = res.colorStayChecked === undefined
      const isDefaultPlayCheckedUntouched = res.defaultPlayChecked === undefined

      this.setState({
        colorStayChecked: isColorStayCheckedUntouched ? false : res.colorStayChecked,
        defaultPlayChecked: isDefaultPlayCheckedUntouched ? true : res.defaultPlayChecked,
        isPlaying: isDefaultPlayCheckedUntouched ? true : res.defaultPlayChecked
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

  render () {
    const { isPlaying, defaultPlayChecked, colorStayChecked, selected } = this.state
    const sketches = { blobs: blobs, waves: waves }
    return (
      <div className='App'>
        <div id='color-name' className={colorStayChecked ? '' : 'fadeout'} />
        <LoadedVerses />
        <P5Wrapper ref={this.myRef} sketch={sketches[selected]} isPlaying={isPlaying} />
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
