import React from 'react';
import { createPortal } from 'react-dom';

interface ConfirmPortalProps {
  children: React.ReactNode;
}

const ConfirmPortal = ({ children }: ConfirmPortalProps) => {
  return createPortal(children, document.getElementById('confirm-root') as HTMLDivElement);
};

export default ConfirmPortal;
