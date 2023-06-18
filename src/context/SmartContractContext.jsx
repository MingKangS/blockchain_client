import React, { useState, useEffect } from "react";
import { contractABI, contractAddress } from "../utils/constants";
const { ethers } = require("ethers");

export const SmartContractContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const postsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return postsContract;
};

export const SmartContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        connectWallet();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      alert("Please connect your MetaMask account and refresh the page.");
    }
  };

  const getAllPosts = async () => {
    try {
      if (ethereum) {
        const postsContract = await createEthereumContract();

        const allPosts = await postsContract.getAllPosts();

        const structuredPosts = allPosts.map((post) => ({
          author: post.author,
          postContent: post.postContent,
          timestamp: post.timestamp,
        }));

        console.log(structuredPosts, allPosts);

        return structuredPosts;
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewPost = async (postContent, timestamp) => {
    console.log(currentAccount, postContent, timestamp, ethereum);
    try {
      if (ethereum) {
        const postsContract = await createEthereumContract();

        const transactionHash = await postsContract.addPost(postContent);

        await transactionHash.wait();

        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SmartContractContext.Provider
      value={{
        connectWallet,
        currentAccount,
        getAllPosts,
        addNewPost,
        checkIfWalletIsConnected,
      }}>
      {children}
    </SmartContractContext.Provider>
  );
};
