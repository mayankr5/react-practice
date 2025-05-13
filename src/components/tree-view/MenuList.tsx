import React from "react";
import MenuItem from "./MenuItem";

interface MenuItemType {
  label: string;
  children?: MenuItemType[];
}

interface MenuListProps {
  list: MenuItemType[];
}

const MenuList: React.FC<MenuListProps> = ({ list }) => {
  return (
    <ul className="menu-list-container">
      {list && list.length > 0
        ? list.map((item, index) => <MenuItem key={index} item={item} />)
        : null}
    </ul>
  );
};

export default MenuList;
