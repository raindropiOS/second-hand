import React from 'react';
import ReactDOM from 'react-dom';

import useOutsideClick from '@hooks/useOutsideClick';
import {
  $ModalLayout,
  $ButtonsLayout,
  $CancelButton,
  $ModalButtons,
  $ModalFirstButton,
  $ModalButton,
} from './Modal.style';

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

export const CHATTING_MODAL_MENUS = [
  { id: 1, text: '채팅방 나가기' },
  { id: 2, text: '신고하기' },
  { id: 3, text: '알람끄기' },
];

interface ModalProps {
  menus: { id: number; text: string }[];
  onClickHandlers: ((() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void))[];
  modalRef?: React.RefObject<HTMLDivElement>;
}

const Modal = ({ menus, onClickHandlers, modalRef }: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <$ModalLayout>
          <$ButtonsLayout ref={modalRef}>
            <$ModalButtons>
              {menus.map(({ id, text }, index) =>
                index === 0 ? (
                  <$ModalFirstButton key={id}>{text}</$ModalFirstButton>
                ) : (
                  <$ModalButton key={id}>{text}</$ModalButton>
                )
              )}
            </$ModalButtons>
            <$CancelButton onClick={event => onClickHandlers[0](event)}>취소</$CancelButton>
          </$ButtonsLayout>
        </$ModalLayout>,
        document.getElementById('modal-root') as HTMLElement
      )}
    </>
  );
};

export default Modal;
