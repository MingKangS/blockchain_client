import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.scss";
import { SmartContractContext } from "../context/SmartContractContext";
import { useContext, useEffect, useState } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

const Layout = () => {
  const { currentProfile: profile } = useContext(SmartContractContext);

  const [profilePicture, setprofilePicture] = useState(profile.profilePicture);

  useEffect(() => {
    setprofilePicture(profile.profilePicture);
  }, [profile]);

  return (
    <div>
      <div className="header">
        <Link to="/" className="header-title">
          Blockster
        </Link>
        <Link to="/profile" className="profileLink">
          <img className="profileIcon" src={profilePicture} />
        </Link>
      </div>
      <NotificationContainer />
      <Outlet />
    </div>
  );
};

export default Layout;
