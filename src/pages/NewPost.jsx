import React, { useState, useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";

const NewPost = () => {
  const [postContent, setPostContent] = useState("");
  const { addNewPost } = useContext(SmartContractContext);
  const postButtonClicked = () => {
    addNewPost(postContent, Date.now());
  };
  return (
    <div>
      <div>
        <input onChange={(e) => setPostContent(e.target.value)} />
        <button onClick={postButtonClicked}>Post</button>
      </div>
    </div>
  );
};

export default NewPost;
