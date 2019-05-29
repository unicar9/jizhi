import React, { Component } from 'react'
import { load } from '../utils/jinrishici'
import { Icon } from 'evergreen-ui'
import Storager from '../utils/storager'
let shici = require('../utils/shici.json')

export default class LoadedVerses extends Component {
  constructor (props) {
    super()
    this.state = {
      verses: {
        content: '红豆生南国，春来发几枝。',
        origin: {
          author: '王维',
          title: '相思'
        }
      }
    }
  }

  componentDidMount () {
    // fetch a verse from storage
    Storager.get(['verses'], res => {
      res.verses && this.setState({ verses: res.verses })
    })
    // fetch verse from jinrishici

    load(result => {
      Storager.set({ verses: result.data })
    }, result => {
      console.log(result)
      const localShici = shici[Math.floor(Math.random() * shici.length)]
      Storager.set({ verses: localShici })
    })
  }

  render () {
    const { content, origin } = this.state.verses
    return (
      <div className={`${this.props.className} verses`}>
        <div id='verses-content'>
          {content}
        </div>
        <div id='verses-origin'>
          <a href={`https://www.google.com/search?q=${origin.author} ${origin.title}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {origin.author} 《{origin.title}》
            <span className='origin-search-icon'>
              <Icon icon='search-text' color='black' />
            </span>
          </a>
        </div>
      </div>
    )
  }
}
