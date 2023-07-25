import React from 'react';
import { useMutation } from '@tanstack/react-query';

import { changeProductStatus } from '@apis/api/productDetail';

import { DetailProductType } from '@type/productsType';
import { $StatusModalLayout, $StatusButton } from './StatusModal.style';
import getStatusWord from '@utils/getStatusWord';
import { useParams } from 'react-router-dom';

interface StatusModalProps {
  currentStatus: number;
  handleRefreshData: (data: DetailProductType) => void;
}

const StatusModal = ({ currentStatus, handleRefreshData }: StatusModalProps) => {
  const productId = useParams<{ productId: string }>().productId;

  const mutateChangeProductStatus = useMutation(
    (newStatus: { productId: string; status: number }) => changeProductStatus(newStatus),
    {
      onSuccess: ({ data }) => {
        handleRefreshData(data);
      },
    }
  );

  const handleChangeStatus = (status: number) => {
    if (!productId) return;
    mutateChangeProductStatus.mutate({ productId, status });
  };

  const remainStatusWord = [0, 1, 2]
    .filter(status => status !== currentStatus)
    .map(status => {
      return { status, word: getStatusWord(status) };
    });

  // TODO(hoonding): 상품 상태 변경 API 호출 후 refreshData 호출.
  return (
    <$StatusModalLayout>
      {remainStatusWord.map(statusWord => (
        <$StatusButton key={statusWord.status} onClick={() => handleChangeStatus(statusWord.status)}>
          {statusWord.word}
        </$StatusButton>
      ))}
    </$StatusModalLayout>
  );
};

export default StatusModal;
