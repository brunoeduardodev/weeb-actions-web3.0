import React from "react";

// import { Container } from './styles';

type Props = {
  title: string;
  className?: string;
};

const NavbarItem: React.FC<Props> = ({ title, className }) => {
  return (
    <li className={`mx-4 cursor-pointer font-semibold ${className}`}>
      {title}
    </li>
  );
};

export default NavbarItem;
