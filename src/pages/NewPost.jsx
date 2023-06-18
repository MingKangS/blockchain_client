import React, { useState, useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import "../styles/NewPost.scss";

const NewPost = () => {
  const [postContent, setPostContent] = useState("");
  const { addNewPost } = useContext(SmartContractContext);
  const postButtonClicked = () => {
    addNewPost(postContent, Date.now());
  };
  return (
    <div className="container">
      <div className="form">
        <textarea
          rows={16}
          placeholder="Write a post ..."
          className="post-content-input"
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button className="post-button" onClick={postButtonClicked}>
          Post
        </button>
      </div>
    </div>
  );
};

export default NewPost;
