import React, { useState, useContext, useRef } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import "../styles/NewPost.scss";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { uploadFileToIPFS } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const NewPostView = () => {
  const imageInput = useRef(null);
  const [postContent, setPostContent] = useState("");
  const [images, setImages] = useState([]);
  const { addNewPost } = useContext(SmartContractContext);
  const navigate = useNavigate();

  const postButtonClicked = async () => {
    await addNewPost(postContent, images)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        NotificationManager.error(
          "An error occurred while adding the post.",
          err
        );
      });
  };

  const onNewImageInput = async (e) => {
    const imageHash = await uploadFileToIPFS(e.target.files[0]);
    setImages(images.concat(`https://ipfs.io/ipfs/${imageHash}`));
  };

  return (
    <div className="container">
      <div className="form">
        <Editor
          onChange={(draft) => setPostContent(JSON.stringify(draft))}
          editorClassName="post-content-input"
        />
        {images.length != 0 && (
          <div className="carousel-container">
            <Carousel>
              {images.map((image) => (
                <img className="post-image" src={image} />
              ))}
            </Carousel>
          </div>
        )}

        <div style={{ display: "flex" }}>
          <button className="post-button" onClick={postButtonClicked}>
            Post
          </button>
          <button
            className="post-button"
            onClick={() => imageInput.current.click()}>
            Add image
          </button>
          <input
            ref={imageInput}
            type="file"
            onChange={onNewImageInput}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPostView;
