import React from 'react';

import { $NavbarLayout } from './Navbar.style';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  return <$NavbarLayout>{children}</$NavbarLayout>;
};

export default Navbar;
