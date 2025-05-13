import { useState } from "react";
import MenuList from "./MenuList";

interface MenuItemProps {
  item: {
    label: string;
    children?: MenuItemProps["item"][];
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [displayChild, setDisplayChild] = useState<Record<string, boolean>>({});

  const handleToggleChildren = (label: string) => {
    setDisplayChild((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <li className="menu-item-container">
      <div className="item">
        <p>{item.label}</p>
        {item.children && item.children.length > 0 && (
          <span onClick={() => handleToggleChildren(item.label)}>
            {displayChild[item.label] ? "-" : "+"}
          </span>
        )}
      </div>
      {item.children && item.children.length > 0 && displayChild[item.label] && (
        <MenuList list={item.children} />
      )}
    </li>
  );
};

export default MenuItem;
