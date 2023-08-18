import React from "react";
import { MenuItemProps } from "../interfaces";

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, href }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick(event);
  };

  return (
    <a href={href} onClick={handleClick} role="menuitem">
      {label}
    </a>
  );
};

export default MenuItem;
