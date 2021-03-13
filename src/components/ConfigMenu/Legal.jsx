import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph, Link, Avatar, Heading } from 'evergreen-ui';
import { WAVES } from '../../constants/appConstants';
import { version } from '../../../package.json';

const Legal = (props) => {
  const { waveColor, selected } = props;
  const hex = waveColor.hex || '';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Avatar src="/static/icons/jizhi-64.png" size={32} name="几枝" />
        <Heading size={500} marginLeft={10}>
          几枝 v{version}
        </Heading>
      </div>
      <div style={{ marginTop: 20 }}></div>
      {selected === WAVES && (
        <Paragraph size={400} marginTop="default">
          中国色：{hex.toUpperCase()} | {waveColor && waveColor.name}
        </Paragraph>
      )}
      <Paragraph size={400} marginTop="default">
        本扩展使用了
        <Link
          href="https://www.jinrishici.com/"
          target="_blank"
          rel="noopener noreferrer"
          marginLeft={5}
          marginRight={5}
          color="green"
        >
          今日诗词 API
        </Link>
      </Paragraph>
      <Paragraph size={400} marginTop="default">
        欢迎访问几枝
        <Link
          href="https://github.com/unicar9/jizhi"
          target="_blank"
          rel="noopener noreferrer"
          marginLeft={5}
          marginRight={5}
          color="green"
        >
          Github主页
        </Link>
        查看
        <Link
          href="https://github.com/unicar9/jizhi/blob/master/CHANGELOG.md"
          target="_blank"
          rel="noopener noreferrer"
          marginLeft={5}
          marginRight={5}
          color="green"
        >
          更新日志
        </Link>
        和
        <Link
          href="https://github.com/unicar9/jizhi/issues
          "
          target="_blank"
          rel="noopener noreferrer"
          marginLeft={5}
          marginRight={5}
          color="green"
        >
          提交反馈
        </Link>
      </Paragraph>
      <Paragraph size={400} marginTop="default">
        <span style={{ color: '#e25555' }}>&#9829;</span>感谢您的支持和喜爱 !
      </Paragraph>
    </div>
  );
};

Legal.propTypes = {
  waveColor: PropTypes.object,
  selected: PropTypes.string,
};

export default Legal;
