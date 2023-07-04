import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.scss";

const Layout = () => {
  return (
    <div>
      <div className="header">
        <Link to="/" className="title">
          Blockster
        </Link>
        <Link to="/profile" className="profileLink">
          <img className="profileIcon" src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"/>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
