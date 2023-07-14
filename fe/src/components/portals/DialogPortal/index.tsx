import React from 'react';
import { createPortal } from 'react-dom';

interface DialogPortalProps {
  children: React.ReactNode;
}

const DialogPortal = ({ children }: DialogPortalProps) => {
  return createPortal(children, document.getElementById('dialog-root') as HTMLDivElement);
};

export default DialogPortal;
