import React, { useState, useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import "../styles/Profile.scss";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ProfileView = () => {
  return (
    <div className="container">
      <div className="profile-box">
        <img className="profile-photo" src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"/>
      </div>
    </div>
  );
};

export default ProfileView;