import React from 'react';

import { $StatusModalLayout, $StatusButton } from './StatusModal.style';
import getStatusWord from '@utils/getStatusWord';

interface StatusModalProps {
  currentStatus: number;
}

const StatusModal = ({ currentStatus }: StatusModalProps) => {
  const remainStatusWord = [0, 1, 2]
    .filter(status => status !== currentStatus)
    .map(status => {
      return { status, word: getStatusWord(status) };
    });

  return (
    <$StatusModalLayout>
      {remainStatusWord.map(statusWord => (
        <$StatusButton key={statusWord.status}>{statusWord.word}</$StatusButton>
      ))}
    </$StatusModalLayout>
  );
};

export default StatusModal;
