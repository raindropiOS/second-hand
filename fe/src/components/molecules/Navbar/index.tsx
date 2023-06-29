import React from 'react';

import { $NavbarLayout } from './Navbar.style';

interface NavbarProps {
  children: React.ReactNode;
  isTransparent?: boolean;
}

const Navbar = ({ children, isTransparent = false }: NavbarProps) => {
  return <$NavbarLayout isTransparent={isTransparent}>{children}</$NavbarLayout>;
};

export default Navbar;
