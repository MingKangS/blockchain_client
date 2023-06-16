import React, { useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const SmartContractContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const postsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return postsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const getAllPosts = async () => {
    try {
      if (ethereum) {
        const postsContract = createEthereumContract();

        const allPosts = await postsContract.getAllPosts();

        const structuredPosts = allPosts.map((post) => ({
          author: post.author,
          postContent: post.postContent,
          timestamp: post.timestamp.toNumber() * 1000,
        }));

        console.log(structuredPosts);

        return structuredPosts;
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
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

      throw new Error("No ethereum object");
    }
  };

  const addNewPost = async (postContent, timestamp) => {
    try {
      if (ethereum) {
        const postsContract = createEthereumContract();

        const transactionHash = await postsContract.addToBlockchain(
          currentAccount,
          postContent,
          timestamp
        );

        await transactionHash.wait();

        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  return (
    <SmartContractContext.Provider
      value={{
        connectWallet,
        currentAccount,
        getAllPosts,
        addNewPost,
        checkIfWalletIsConnect,
      }}>
      {children}
    </SmartContractContext.Provider>
  );
};
