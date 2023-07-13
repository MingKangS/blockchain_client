import React, { useState, useContext, useEffect, useRef } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import "../styles/Profile.scss";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FaPen, FaImage } from "react-icons/fa";
import LoadingSpinner from "../components/loadingSpinner";
import { uploadFileToIPFS } from "../utils/functions";

const ProfileView = () => {
  const {
    currentProfile: profile,
    editProfile,
    getProfile,
  } = useContext(SmartContractContext);

  useEffect(() => {
    setprofilePicture(profile.profilePicture);
  }, [profile]);

  const [profilePicture, setprofilePicture] = useState(profile.profilePicture);

  const imageInput = useRef(null);

  const editUsername = async () => {
    const newUsername = prompt("Please enter a new username:");
    await editProfile(newUsername, profilePicture, profile.color);
    const newProfile = await getProfile();
    console.log(newProfile);
  };

  const onNewImageInput = async (e) => {
    const imageHash = await uploadFileToIPFS(e.target.files[0]);
    const newProfilePicture = `https://ipfs.io/ipfs/${imageHash}`;
    await editProfile(profile.username, newProfilePicture, profile.color);
    const newProfile = await getProfile();
    console.log(newProfile);
    setprofilePicture(newProfilePicture);
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

          <h1 className="username" style={{ color: profile.color }}>
            @{profile.username}&nbsp;
            <FaPen
              style={{
                fontSize: "18px",
                cursor: "pointer",
                color: "black",
              }}
              onClick={editUsername}
            />
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
