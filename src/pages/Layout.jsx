import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.scss";

const Layout = () => {
  return (
    <div>
      <div className="header">
        <Link to="/" className="title">
          Blockster
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
