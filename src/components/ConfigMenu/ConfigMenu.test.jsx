import React from 'react'
import { shallow } from 'enzyme'

import ConfigMenu from '.'

describe('ConfigMenu', () => {
  const setupProps = {
    onSaveSelect: jest.fn(),
    onPlayPauseSelect: jest.fn(),
    isPlaying: true,
    defaultPlayChecked: true,
    onDefaultPlayChange: jest.fn(),
    colorStayChecked: false,
    onColorStayChange: jest.fn(),
    selected: 'test',
    onBgOptionChange: jest.fn(),
    isVerticalVerses: false,
    onVersesLayoutChange: jest.fn()
  }

  it('should render correctly', () => {
    const wrapper = shallow(<ConfigMenu {...setupProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should set isOpen state to true when calling onOpen function in Popover', () => {
    const wrapper = shallow(<ConfigMenu {...setupProps} />)
    wrapper.find('Popover').props().onOpen()

    expect(wrapper.state().isOpen).toEqual(true)
  })

  it('should set isOpen state to false when calling onClose function in Popover', () => {
    const wrapper = shallow(<ConfigMenu {...setupProps} />)
    wrapper.find('Popover').props().onClose()

    expect(wrapper.state().isOpen).toEqual(false)
  })
})
