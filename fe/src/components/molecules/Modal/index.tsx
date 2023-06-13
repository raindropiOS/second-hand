import React from 'react';
import useOutsideClick from '@hooks/useOutsideClick';
import { $ModalLayout, $CancelButton, $ModalButtons, $ModalFirstButton, $ModalButton } from './Modal.style';

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
  const [isOpen, setIsOpen, ref] = useOutsideClick(false);

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    console.log(1);
  };

  return (
    <$ModalLayout ref={ref} onClick={handleModalClick}>
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
