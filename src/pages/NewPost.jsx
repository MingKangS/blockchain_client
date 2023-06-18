import React, { useState, useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import "../styles/NewPost.scss";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const NewPost = () => {
  const [postContent, setPostContent] = useState("");
  const { addNewPost } = useContext(SmartContractContext);
  const postButtonClicked = () => {
    addNewPost(postContent, Date.now());
  };
  return (
    <div className="container">
      <div className="form">
        <Editor
          onChange={(draft) => setPostContent(JSON.stringify(draft))}
          editorClassName="post-content-input"
        />
        {/* <textarea
          rows={16}
          placeholder="Write a post ..."
          className="post-content-input"
          onChange={(e) => setPostContent(e.target.value)}
        /> */}
        <button className="post-button" onClick={postButtonClicked}>
          Post
        </button>
      </div>
    </div>
  );
};

export default NewPost;
