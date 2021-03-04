import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pane, Menu, Tablist, Switch, SidebarTab, SegmentedControl } from 'evergreen-ui';
import styled from 'styled-components';
import Legal from './Legal';
import FontStatement from './FontStatement';
import SaveBgMenuItem from './SaveBgMenuItem';

const SwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MenuContent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    isPlaying,
    onPlayPauseSelect,
    showSearchBarChecked,
    onShowSearchBarChange,
    defaultPlayChecked,
    isVerticalVerses,
    onVersesLayoutChange,
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
  } = props;

  const tabs = [
    {
      tabName: '背景',
      tabContent: (
        <Menu.OptionsGroup
          options={[
            { label: 'Waves', value: 'waves' },
            { label: 'Blobs', value: 'blobs' },
          ]}
          selected={selected}
          onChange={onBgOptionChange}
        />
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
            <Menu.Item intent="success">
              <SwitchWrapper>
                黑夜模式
                <Switch checked={darkModeChecked} onChange={onDarkModeChange} />
              </SwitchWrapper>
            </Menu.Item>
            <Menu.Item intent="success">
              <SwitchWrapper>
                默认播放动画
                <Switch checked={defaultPlayChecked} onChange={onDefaultPlayChange} />
              </SwitchWrapper>
            </Menu.Item>
            {selected === 'waves' && (
              <Menu.Item intent="success">
                <SwitchWrapper>
                  保留颜色名称
                  <Switch checked={colorStayChecked} onChange={onColorStayChange} />
                </SwitchWrapper>
              </Menu.Item>
            )}
            <Menu.Item intent="success">
              <SwitchWrapper>
                显示搜索框
                <Switch checked={showSearchBarChecked} onChange={onShowSearchBarChange} />
              </SwitchWrapper>
            </Menu.Item>
            <Menu.Item intent="success">
              <SwitchWrapper>
                竖版诗词
                <Switch checked={isVerticalVerses} onChange={onVersesLayoutChange} />
              </SwitchWrapper>
            </Menu.Item>
          </Menu.Group>
          <Menu.Divider />

          <Menu.Group title="搜索引擎">
            <div style={{ margin: 16 }}>
              <SegmentedControl
                width={300}
                options={[
                  {
                    label: 'Google',
                    value: 'https://www.google.com/search?q=',
                  },
                  { label: 'Baidu', value: 'https://www.baidu.com/s?wd=' },
                  {
                    label: 'Bing',
                    value: 'https://www.bing.com/search?q=',
                  },
                ]}
                value={engineOption}
                onChange={onEngineOptionChange}
              />
            </div>
          </Menu.Group>
        </>
      ),
    },
    {
      tabName: '字体',
      tabContent: (
        <Menu.Group title="选择字体">
          <div style={{ margin: 16 }}>
            <SegmentedControl
              width={300}
              options={[
                { label: '江西拙楷', value: 'JXZhuoKai' },
                { label: '欣意吉祥宋', value: 'JiXiangSong' },
                { label: '方正细金陵', value: 'FZXiJinLJW' },
              ]}
              value={fontName}
              onChange={onFontTypeChange}
            />
            <FontStatement fontName={fontName} />
          </div>
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
  onVersesLayoutChange: PropTypes.func.isRequired,
  isVerticalVerses: PropTypes.bool.isRequired,
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
};

export default MenuContent;
