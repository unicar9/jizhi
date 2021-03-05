import React from 'react';
import { Menu } from 'evergreen-ui';
import { saveBackground } from '../../utils';

const SaveBgMenuItem = () => (
  <Menu.Item
    icon="download"
    intent="success"
    onSelect={() => saveBackground()}
    secondaryText="Alt + S"
  >
    保存背景
  </Menu.Item>
);

export default SaveBgMenuItem;
