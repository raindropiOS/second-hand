import React from 'react';

import { $ModalLayout, $CancelButton, $ModalButtons, $ModalFirstButton, $ModalButton } from './Modal.style';

// TODO(hoonding): constants 파일로 빼기.
// TODO(hoonding): 클릭 시 fetch 요청 보내는 함수 담기.
export const SALE_MODAL_MENUS = [
  { id: 1, text: '삭제' },
  { id: 2, text: '판매 완료 상태로 전환' },
  { id: 3, text: '판매중 상태로 전환' },
  { id: 4, text: '게시글 수정' },
];

export const DETAIL_MODAL_MENUS = [
  { id: 1, text: '삭제' },
  { id: 2, text: '게시글 수정' },
];

interface ModalProps {
  menus: { id: number; text: string }[];
}

const Modal = ({ menus }: ModalProps) => {
  // TODO(hoonding): 딤처리 + 클릭 이벤트
  return (
    <$ModalLayout>
      <$ModalButtons>
        {menus.map(({ id, text }, index) =>
          index === 0 ? (
            <$ModalFirstButton key={id}>{text}</$ModalFirstButton>
          ) : (
            <$ModalButton key={id}>{text}</$ModalButton>
          )
        )}
      </$ModalButtons>
      <$CancelButton>취소</$CancelButton>
    </$ModalLayout>
  );
};

export default Modal;
