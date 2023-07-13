import React, { useState, useEffect } from "react";
import { contractABI, contractAddress } from "../utils/constants";
import uniqolor from "uniqolor";
import { NotificationManager } from "react-notifications";

var UsernameGenerator = require("username-generator");
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
  const [currentProfile, setcurrentProfile] = useState({});

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (currentAccount) getProfile();
  }, [currentAccount]);

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
    } catch (error) {
      console.log(error);

      alert("Please connect your MetaMask account and refresh the page.");
    }
  };

  const getAllPosts = async () => {
    try {
      const postsContract = await createEthereumContract();

      const allPosts = await postsContract.getAllPosts();

      const structuredPosts = allPosts.map((post) => ({
        id: post.id,
        authorId: post.authorId,
        author: post.author,
        postContent: post.postContent,
        timestamp: Number(post.timestamp),
        images: Array.from(post.images),
        comments: Array.from(post.comments).map((comment) => ({
          author: {
            username: comment[0][0],
            color: comment[0][1],
            profilePicture: comment[0][2],
          },
          text: comment[1],
          timestamp: Number(comment[2]),
        })),
        upvotes: Array.from(post.upvotes),
        downvotes: Array.from(post.downvotes),
      }));

      console.log(structuredPosts, allPosts);

      return structuredPosts;
    } catch (error) {
      console.log(error);
    }
    return [
      // {
      //   author: { username: "post.author", profilePhoto: "", color: "#123456" },
      //   postContent:
      //     '{"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"height":"112","src":"https://raw.githubusercontent.com/facebook/draft-js/master/examples/draft-0-10-0/convertFromHTML/image.png","width":"200"}}},"blocks":[{"key":"64v27","text":"Bold text idk what is sthie eids tai asdsospeo sekj e eijea e aaa igna aindgeingfkdmnegk sdgksd skdgsd skdgjsodi gsgs. sd sd s .sgsgsnesonkenlsefsd.fsfsdg.swegseshn esoeia emfekie aeij sm tshttps://raw.githubusercontent.com/facebook/draft-js/master/examples/draft-0-10-0/convertFromHTML/image.png","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"}],"entityRanges":[{"offset":9,"length":106,"key":0}],"data":{}}]}',
      //   timestamp: 92344567,
      //   upvotes: 12,
      //   downvotes: 4,
      //   comments: [{
      //     author: { username: "dijkstra", profilePhoto: "", color: "#FF3456" },
      //     text: "lmao this shyt is so tru lmairfjew reia eirjasera .aerawirawrijw wirjwoaw a. aewra ew.",
      //     timestamp: 996544573
      //   },{
      //     author: { username: "dijkstrlmaoa", profilePhoto: "", color: "#6F34EE" },
      //     text: "lmaoasg adfg",
      //     timestamp: 783645735
      //   },{
      //     author: { username: "dud", profilePhoto: "", color: "#3FCVAE" },
      //     text: "lmaoasg adfg",
      //     timestamp: 783645735
      //   }]
      // },
    ];
  };

  const addNewPost = async (postContent, images) => {
    console.log(currentAccount, postContent, images, ethereum);
    try {
      const postsContract = await createEthereumContract();

      const transactionHash = await postsContract.addPost(postContent, images);
      NotificationManager.info("Your post is being added. Please wait.");
      await transactionHash.wait();
      NotificationManager.info("Your post has been successfully created.");
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const postsContract = await createEthereumContract();
      console.log(currentAccount);
      const profile = await postsContract.getAccount(
        ethers.getAddress(currentAccount)
      );

      setcurrentProfile({
        username: profile[0],
        color: profile[1],
        profilePicture: profile[2],
      });

      console.log(profile);

      if (!profile || !profile.username) {
        const username = UsernameGenerator.generateUsername();
        const color = uniqolor.random({
          saturation: [30, 80],
          lightness: [10, 50],
        }).color;
        NotificationManager.info(
          "Hey there! It seems like this is your first time here. A new profile is being created for you.",
          "Profile creation for new account"
        );
        editProfile(
          username,
          "https://cdn-icons-png.flaticon.com/512/6522/6522516.png",
          color
        );
      }
      return profile;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const editProfile = async (username, profilePicture, color) => {
    try {
      const postsContract = await createEthereumContract();

      const transactionHash = await postsContract.editAccount({
        username,
        profilePicture,
        color,
      });
      NotificationManager.info("Your account is being updated. Please wait.");
      await transactionHash.wait();
      NotificationManager.success("Your account has been successfully updated");
      getProfile();
      console.log(transactionHash);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (postId, comment) => {
    try {
      const postsContract = await createEthereumContract();

      const transactionHash = await postsContract.addComment(postId, comment);
      NotificationManager.info("Your comment is being added. Please wait.");
      await transactionHash.wait();
      NotificationManager.success("Your comment is has successfully added.");
      console.log(transactionHash);
    } catch (error) {
      console.log(error);
    }
  };

  const upvotePost = async (postId) => {
    try {
      const postsContract = await createEthereumContract();

      const transactionHash = await postsContract.upvotePost(postId);

      NotificationManager.info("Your upvote is being added. Please wait.");
      await transactionHash.wait();
      NotificationManager.success("Your upvote is has successfully added.");

      console.log(transactionHash);
    } catch (error) {
      console.log(error);
    }
  };

  const downvotePost = async (postId) => {
    try {
      const postsContract = await createEthereumContract();

      const transactionHash = await postsContract.downvotePost(postId);
      NotificationManager.info("Your downvote is being added. Please wait.");

      await transactionHash.wait();
      NotificationManager.success("Your downvote is has successfully added.");

      console.log(transactionHash);
    } catch (error) {
      console.log(error);
    }
  };

  const reportPost = async (postId) => {
    try {
      const postsContract = await createEthereumContract();

      const transactionHash = await postsContract.reportPost(postId);
      NotificationManager.warning("This post is being reported");
      await transactionHash.wait();
      NotificationManager.success(
        "Thank you for reporting. Our moderators will investigate if this post violates our user guidelines.",
        "This post has been reported."
      );
      console.log(transactionHash);
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
        currentProfile,
        editProfile,
        getProfile,
        addComment,
        downvotePost,
        upvotePost,
        reportPost,
      }}>
      {children}
    </SmartContractContext.Provider>
  );
};
