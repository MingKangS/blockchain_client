import React, { useState, useContext, useEffect, useRef } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import "../styles/Profile.scss";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FaPen, FaImage } from "react-icons/fa";
import LoadingSpinner from "../components/loadingSpinner";

const ProfileView = () => {
  const { currentProfile: profile } = useContext(SmartContractContext);

  useEffect(() => {
    setprofilePicture(profile.profilePicture);
  }, [profile]);

  const [profilePicture, setprofilePicture] = useState(profile.profilePicture);

  const imageInput = useRef(null);

  const editUsername = () => {
    const newUsername = prompt("Please enter a new username:");
    console.log(newUsername);
  };

  const onNewImageInput = (e) => {
    console.log(e.target.files[0]);
    setprofilePicture(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container">
      {!profile.username ? (
        <LoadingSpinner size={80} />
      ) : (
        <div className="profile-box">
          <div className="photo-container">
            <img className="profile-photo" src={profilePicture} />
            <div
              className="edit-photo"
              onClick={() => imageInput.current.click()}>
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
            @{profile.username}&nbsp;
            <FaPen
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={editUsername}
            />
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
