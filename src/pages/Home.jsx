import React, { useContext, useState, useEffect } from "react";
import { SmartContractContext } from "../context/SmartContractContext";

const Home = () => {
  const { getAllPosts } = useContext(SmartContractContext);
  useEffect(() => {
    getAllPosts();
  }, []);
  return <div>home lol</div>;
};

export default Home;
