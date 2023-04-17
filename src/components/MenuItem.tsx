import React from 'react';

interface MenuItemProps {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  label: string;
  href: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, href }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick(event);
  };

  return (
    <a href={href} onClick={handleClick} role='menuitem'>
      {label}
    </a>
  );
};

export default MenuItem;
