import React, { Component } from 'react';
import { Popover, Position, Icon } from 'evergreen-ui';
import styled, { css } from 'styled-components';
import MenuContent from './MenuContent';

const MenuWrapper = styled.div`
  position: absolute;
  left: 30px;
  bottom: 20px;
`;

const MenuButton = styled(Icon)`
  opacity: 0.6;
  cursor: pointer;
  transition: all 300ms ease;
  transform-origin: 50% 50%;

  &:hover {
    opacity: 1;
  }

  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      transform: rotate(45deg) scale(1.1);
    `}
`;

class ConfigMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleOnOpen = () => this.setState({ isOpen: true });

  handleOnClose = () => this.setState({ isOpen: false });

  render() {
    return (
      <MenuWrapper>
        <Popover
          position={Position.BOTTOM_LEFT}
          onOpen={this.handleOnOpen}
          onClose={this.handleOnClose}
          content={<MenuContent {...this.props} />}
        >
          <MenuButton
            id="menu-button"
            icon="cog"
            size={20}
            color="white"
            isOpen={this.state.isOpen}
          />
        </Popover>
      </MenuWrapper>
    );
  }
}

export default ConfigMenu;
