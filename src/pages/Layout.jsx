import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.scss";
import { SmartContractContext } from "../context/SmartContractContext";
import { useContext, useEffect, useState } from "react";

const Layout = () => {
  const { currentProfile: profile } = useContext(SmartContractContext);

  const [profilePicture, setprofilePicture] = useState(profile.profilePicture);

  useEffect(() => {
    setprofilePicture(profile.profilePicture);
  }, [profile]);

  return (
    <div>
      <div className="header">
        <Link to="/" className="title">
          Blockster
        </Link>
        <Link to="/profile" className="profileLink">
          <img className="profileIcon" src={profilePicture} />
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
