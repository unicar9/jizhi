import React, { Component } from 'react'
import { Menu } from 'evergreen-ui'
import { saveBackground } from '../../utils/'

export default class SaveBgMenuItem extends Component {
  render () {
    return (
      <Menu.Item
        icon='download'
        intent='success'
        onSelect={() => saveBackground()}
        secondaryText='Alt + S'
      >
        保存背景
      </Menu.Item>
    )
  }
}
