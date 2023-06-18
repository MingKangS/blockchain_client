import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SmartContractContext } from "../context/SmartContractContext";
import "../styles/Home.scss";
import Post from "../components/Post";

const Home = () => {
  const { getAllPosts } = useContext(SmartContractContext);

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then((res) => {
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
        <div>
          {allPosts.map((post, idx) => (
            <Post post={post} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
