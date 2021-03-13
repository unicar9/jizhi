import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  Menu,
  Tablist,
  Switch,
  SidebarTab,
  SegmentedControl,
  Spinner,
  Text,
} from 'evergreen-ui';
import styled from 'styled-components';
import { WAVES } from '../../constants/appConstants';
import Legal from './Legal';
import FontStatement from './FontStatement';
import SaveBgMenuItem from './SaveBgMenuItem';

const SwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SegmentedControlWrapper = styled.div`
  margin: 16px;
`;

const MenuContent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    isPlaying,
    onPlayPauseSelect,
    showSearchBarChecked,
    onShowSearchBarChange,
    defaultPlayChecked,
    verticalVersesChecked,
    onVerticalVersesChange,
    onDefaultPlayChange,
    colorStayChecked,
    onColorStayChange,
    selected,
    onBgOptionChange,
    engineOption,
    onEngineOptionChange,
    fontName,
    onFontTypeChange,
    darkModeChecked,
    onDarkModeChange,
    isFontLoading,
  } = props;

  const bgOptions = [
    { label: 'Waves', value: 'waves' },
    { label: 'Blobs', value: 'blobs' },
  ];

  const engineOptions = [
    {
      label: 'Google',
      value: 'https://www.google.com/search?q=',
    },
    { label: 'Baidu', value: 'https://www.baidu.com/s?wd=' },
    {
      label: 'Bing',
      value: 'https://www.bing.com/search?q=',
    },
  ];

  const fontOptions = [
    { label: '江西拙楷', value: 'JXZhuoKai' },
    { label: '欣意吉祥宋', value: 'JiXiangSong' },
    { label: '方正细金陵', value: 'FZXiJinLJW' },
  ];

  const switchOptions = [
    {
      name: '黑夜模式',
      checkedState: darkModeChecked,
      onChangeFunc: onDarkModeChange,
    },
    {
      name: '竖版诗词',
      checkedState: verticalVersesChecked,
      onChangeFunc: onVerticalVersesChange,
    },
    {
      name: '默认播放动画',
      checkedState: defaultPlayChecked,
      onChangeFunc: onDefaultPlayChange,
    },
    {
      name: '显示搜索框',
      checkedState: showSearchBarChecked,
      onChangeFunc: onShowSearchBarChange,
    },
    {
      name: '保留颜色名称',
      checkedState: colorStayChecked,
      onChangeFunc: onColorStayChange,
    },
  ];

  const tabs = [
    {
      tabName: '背景',
      tabContent: (
        <Menu.OptionsGroup options={bgOptions} selected={selected} onChange={onBgOptionChange} />
      ),
    },
    {
      tabName: '操作',
      tabContent: (
        <Menu.Group>
          <SaveBgMenuItem />
          <Menu.Item
            icon={isPlaying ? 'pause' : 'play'}
            intent="success"
            onSelect={onPlayPauseSelect}
            secondaryText="Space"
          >
            {isPlaying ? '暂停动画' : '播放动画'}
          </Menu.Item>
        </Menu.Group>
      ),
    },
    {
      tabName: '设置',
      tabContent: (
        <>
          <Menu.Group title="偏好">
            {switchOptions.map((option) => {
              if (selected !== WAVES && option.name === '保留颜色名称') return;
              return (
                <Menu.Item key={option.name}>
                  <SwitchWrapper>
                    {option.name}
                    <Switch checked={option.checkedState} onChange={option.onChangeFunc} />
                  </SwitchWrapper>
                </Menu.Item>
              );
            })}
          </Menu.Group>
          <Menu.Divider />

          <Menu.Group title="搜索引擎">
            <SegmentedControlWrapper>
              <SegmentedControl
                width={280}
                options={engineOptions}
                value={engineOption}
                onChange={onEngineOptionChange}
              />
            </SegmentedControlWrapper>
          </Menu.Group>
        </>
      ),
    },
    {
      tabName: '字体',
      tabContent: (
        <Menu.Group title="选择字体">
          <SegmentedControlWrapper>
            <SegmentedControl
              width={280}
              options={fontOptions}
              value={fontName}
              onChange={onFontTypeChange}
            />
            {isFontLoading ? (
              <Pane height={30} width={280} marginBottom={-10} marginTop={10} display="flex">
                <Spinner size={20} marginRight={5} />
                <Text>远程加载中……</Text>
              </Pane>
            ) : (
              <FontStatement fontName={fontName} />
            )}
          </SegmentedControlWrapper>
        </Menu.Group>
      ),
    },
    { tabName: '声明', tabContent: <Legal /> },
  ];

  return (
    <Pane display="flex" height={300}>
      <Tablist width={80} margin={10}>
        {tabs.map(({ tabName }, index) => (
          <SidebarTab
            key={tabName}
            id={tabName}
            onSelect={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
            aria-controls={`panel-${tabName}`}
          >
            {tabName}
          </SidebarTab>
        ))}
      </Tablist>
      <Pane width={350} background="tint1">
        {tabs.map(({ tabName, tabContent }, index) => (
          <Pane
            key={tabName}
            id={`panel-${tabName}`}
            role="tabpanel"
            aria-labelledby={tabName}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'block' : 'none'}
          >
            {tabContent}
          </Pane>
        ))}
      </Pane>
    </Pane>
  );
};

MenuContent.propTypes = {
  children: PropTypes.any,
  showSearchBarChecked: PropTypes.bool,
  onShowSearchBarChange: PropTypes.func,
  darkModeChecked: PropTypes.bool,
  onDarkModeChange: PropTypes.func,
  onPlayPauseSelect: PropTypes.func.isRequired,
  onVerticalVersesChange: PropTypes.func.isRequired,
  verticalVersesChecked: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  defaultPlayChecked: PropTypes.bool.isRequired,
  onDefaultPlayChange: PropTypes.func.isRequired,
  colorStayChecked: PropTypes.bool.isRequired,
  onColorStayChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
  onBgOptionChange: PropTypes.func,
  engineOption: PropTypes.string,
  onEngineOptionChange: PropTypes.func,
  fontName: PropTypes.string,
  onFontTypeChange: PropTypes.func,
  isFontLoading: PropTypes.bool,
};

export default MenuContent;
