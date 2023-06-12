import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useTheme } from 'styled-components';

import { $ChatTabBar, $SendButton, $ChatInput } from './ChatTabBar.style';
import Icon from '@components/atoms/Icon';

const ChatTabBar = () => {
  const theme = useTheme();
  const [chatText, setChatText] = useState('');

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setChatText(target.value);
  };

  const handleButtonClick = () => {
    // TODO: 메세지 send하는 API
    setChatText('');
  };

  const handleEnterKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleButtonClick(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <$ChatTabBar>
      <$ChatInput onChange={onChange} onKeyDown={handleEnterKeyDown} value={chatText} placeholder="내용을 입력하세요" />
      <$SendButton onClick={handleButtonClick}>
        <Icon name="arrowUp" width={14} height={14} fill={theme.COLORS.ACCENT.TEXT.DEFAULT} />
      </$SendButton>
    </$ChatTabBar>
  );
};

export default ChatTabBar;
