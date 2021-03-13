import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph, Avatar, Heading, Pane, HeartIcon } from 'evergreen-ui';
import styled, { keyframes } from 'styled-components';
import { WAVES, JIZHI_LINKS } from '../../constants/appConstants';
import { version } from '../../../package.json';
import CustomLink from './CustomLink';

const pulse = keyframes`
  10% {
    transform: scale(1.2)
  }
`;

const HeartPulse = styled(HeartIcon)`
  animation: ${pulse} 1.2s infinite;
`;

const LegalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px;
`;

const Legal = (props) => {
  const { waveColor, selected } = props;
  const hex = waveColor.hex || '';

  return (
    <LegalWrapper>
      <Pane display="flex" alignItems="center">
        <Avatar src="/static/icons/jizhi-64.png" size={32} name="几枝" />
        <Heading size={500} marginLeft={10}>
          几枝 v{version}
        </Heading>
      </Pane>

      {selected === WAVES && (
        <Paragraph size={400} marginTop="default">
          中国色：{hex.toUpperCase()} | {waveColor && waveColor.name}
        </Paragraph>
      )}
      <Paragraph size={400} marginTop="default">
        本扩展使用了
        <CustomLink url={JIZHI_LINKS.jinrishici.link} name={JIZHI_LINKS.jinrishici.name} />
      </Paragraph>
      <Paragraph size={400} marginTop="default">
        欢迎访问几枝
        <CustomLink url={JIZHI_LINKS.home.link} name={JIZHI_LINKS.home.name} />
        查看
        <CustomLink url={JIZHI_LINKS.changelog.link} name={JIZHI_LINKS.changelog.name} />和
        <CustomLink url={JIZHI_LINKS.issues.link} name={JIZHI_LINKS.issues.name} />
      </Paragraph>
      <Paragraph size={400} marginTop="default">
        <HeartPulse color="#e25555" size={14} marginRight={5} />
        感谢您的支持和喜爱
      </Paragraph>
    </LegalWrapper>
  );
};

Legal.propTypes = {
  waveColor: PropTypes.object,
  selected: PropTypes.string,
};

export default Legal;
