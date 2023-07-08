import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SmartContractContext } from "../context/SmartContractContext";
import "../styles/Home.scss";
import LoadingSpinner from "../components/loadingSpinner";
import Post from "../components/Post";

const HomeView = () => {
  const { getAllPosts } = useContext(SmartContractContext);

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then((res) => {
        console.log(res);
        setAllPosts(res);
      })
      .catch((err) => {
        console.log(err);
        alert("An error occured while fetching the posts.");
      });
  }, []);

  return (
    <div className="container">
      <div className="content">
        <Link to="/new-post" className="new-post-button">
          Create a post ...
        </Link>
        {allPosts.length != 0 ? (
          <div>
            {allPosts.map((post, idx) => (
              <Post post={post} key={idx} />
            ))}
          </div>
        ) : (
          <LoadingSpinner size={80} />
        )}
      </div>
    </div>
  );
};

export default HomeView;
