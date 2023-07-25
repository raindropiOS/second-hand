import React from 'react';
import { useMutation } from '@tanstack/react-query';

import { DetailProductType } from '@type/productsType';
import { $StatusModalLayout, $StatusButton } from './StatusModal.style';
import getStatusWord from '@utils/getStatusWord';

interface StatusModalProps {
  currentStatus: number;
  handleRefreshData: (data: DetailProductType) => void;
}

const StatusModal = ({ currentStatus, handleRefreshData }: StatusModalProps) => {
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
