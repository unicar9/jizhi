import React from 'react';
import { Menu } from 'evergreen-ui';
import { saveBackground } from '../../utils';

<<<<<<< HEAD
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
=======
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

export { SaveBgMenuItem as default };
>>>>>>> 5f1bf7772c58bead3f56d1c390b5c32f8f8be9e0
