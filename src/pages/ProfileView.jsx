import React, { useState, useContext, useRef } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import "../styles/Profile.scss";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FaPen, FaImage } from "react-icons/fa";

const ProfileView = () => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
  );
  const imageInput = React.useRef(null);

  const editUsername = () => {
    const newUsername = prompt("Please enter a new username:");
    console.log(newUsername);
  };

  const onNewImageInput = (e) => {
    console.log(e.target.files[0])
    setProfilePhoto(URL.createObjectURL(e.target.files[0]))
  };
  
  return (
    <div className="container">
      <div className="profile-box">
        <div className="photo-container">
          <img
            className="profile-photo"
            src={profilePhoto}
          />
          <div
            className="edit-photo"
            onClick={() => imageInput.current.click()}
          >
            <FaImage style={{ margin: "auto" }} />
            <input
              ref={imageInput}
              type="file"
              onChange={onNewImageInput}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <h1 className="username">
          @someName&nbsp;
          <FaPen style={{ fontSize: "18px" }} onClick={editUsername} />
        </h1>
      </div>
    </div>
  );
};

export default ProfileView;
