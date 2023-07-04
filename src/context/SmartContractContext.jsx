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

  const getProfile = async () => {
    try {
      if (ethereum) {
        const postsContract = await createEthereumContract();

        const allPosts = await postsContract.getAllPosts();

        const structuredPosts = allPosts.map((post) => ({
          author: post.author,
          postContent: post.postContent,
          timestamp: Number(post.timestamp),
        }));

        console.log(structuredPosts, allPosts);

        return structuredPosts;
      } else {
        console.log(
          "Ethereum is not present. Your browser does not have support for the ethereum blockchain network."
        );
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const getAllPosts = async () => {
    try {
      if (ethereum) {
        const postsContract = await createEthereumContract();

        const allPosts = await postsContract.getAllPosts();

        const structuredPosts = allPosts.map((post) => ({
          author: post.author,
          postContent: post.postContent,
          timestamp: Number(post.timestamp),
        }));

        console.log(structuredPosts, allPosts);

        return structuredPosts;
      } else {
        console.log(
          "Ethereum is not present. Your browser does not have support for the ethereum blockchain network."
        );
      }
    } catch (error) {
      console.log(error);
    }
    return [
      {
        author: { username: "post.author", profilePhoto: "", color: "#123456" },
        postContent:
          '{"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"112","src":"https://raw.githubusercontent.com/facebook/draft-js/master/examples/draft-0-10-0/convertFromHTML/image.png","width":"200"}}},"blocks":[{"key":"64v27","text":"Bold text idk what is sthie eids tai asdsospeo sekj e eijea e aaa igna aindgeingfkdmnegk sdgksd skdgsd skdgjsodi gsgs. sd sd s .sgsgsnesonkenlsefsd.fsfsdg.swegseshn esoeia emfekie aeij sm tshttps://raw.githubusercontent.com/facebook/draft-js/master/examples/draft-0-10-0/convertFromHTML/image.png","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"}],"entityRanges":[{"offset":9,"length":106,"key":0}],"data":{}}]}',
        timestamp: 92344567,
        upvotes: 12,
        downvotes: 4,
        comments: [{
          author: { username: "dijkstra", profilePhoto: "", color: "#FF3456" },
          text: "lmao this shyt is so tru lmairfjew reia eirjasera .aerawirawrijw wirjwoaw a. aewra ew.",
          timestamp: 996544573
        },{
          author: { username: "dijkstrlmaoa", profilePhoto: "", color: "#6F34EE" },
          text: "lmaoasg adfg",
          timestamp: 783645735
        },{
          author: { username: "dud", profilePhoto: "", color: "#3FCVAE" },
          text: "lmaoasg adfg",
          timestamp: 783645735
        }]
      },
    ];
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
      }}
    >
      {children}
    </SmartContractContext.Provider>
  );
};
