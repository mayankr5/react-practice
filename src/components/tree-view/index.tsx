import MenuList from "./MenuList";
import menus from "./data";
import "./styles.css";

const TreeView: React.FC = () => {
  return (
    <div className="container">
      <MenuList list={menus} />
    </div>
  );
};

export default TreeView;
