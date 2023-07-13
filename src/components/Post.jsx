import React, { useState, useContext } from "react";
import moment from "moment/moment";
import "../styles/components/Post.scss";
import draftToHtml from "draftjs-to-html";
import sanitizeHtml from "sanitize-html";
import {
  TbArrowBigDownFilled,
  TbArrowBigDown,
  TbArrowBigUp,
  TbArrowBigUpFilled,
} from "react-icons/tb";
import { BiUpvote, BiDownvote, BiCommentDetail } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";
import { TbMessageReport } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { SmartContractContext } from "../context/SmartContractContext";
import { NotificationManager } from "react-notifications";
const ethers = require("ethers");

const Post = ({ post: _post }) => {
  const {
    currentProfile,
    currentAccount,
    addComment,
    downvotePost,
    upvotePost,
    reportPost,
  } = useContext(SmartContractContext);

  const [commentInput, setCommentInput] = useState("");
  const [post, setPost] = useState(_post);

  const onCommentSent = async () => {
    await addComment(post.id, commentInput).then((res) => {
      post.comments.push({
        author: currentProfile,
        text: commentInput,
        timestamp: Date.now() / 1000,
      });
    });

    setCommentInput("");
  };

  const donateEth = async () => {
    const amount =
      window.prompt(
        "Enter the amount of Ethereum you would like to donate to the author of this post."
      ) ?? NaN;
    if (isNaN(Number(amount))) {
      NotificationManager.error(
        "Please input a valid number.",
        "Invalid amount"
      );
      return;
    }
    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: currentAccount,
          to: post.authorId,
          gas: "0x5208",
          value: ethers.parseEther(amount)._hex,
        },
      ],
    });
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <img src={post.author.profilePicture} className="author-photo" />
        <p className="author" style={{ color: post.author.color }}>
          {post.author.username}
        </p>
        <p className="timestamp">{moment.unix(post.timestamp).fromNow()}</p>
        {post.authorId.toLowerCase() != currentAccount && (
          <FaEthereum className="ethereum-icon" onClick={donateEth} />
        )}
        {post.authorId.toLowerCase() != currentAccount && (
          <TbMessageReport
            className="report-icon"
            onClick={() => reportPost(post.id)}
          />
        )}
      </div>
      <p
        onClick={onCommentSent}
        className="postContent"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(
            draftToHtml(
              JSON.parse(post.postContent.length ? post.postContent : "{}")
            )
          ),
        }}></p>
      <div className="carousel-container">
        <Carousel>
          {post.images?.map((image, idx) => (
            <img key={idx} className="post-image" src={image} />
          ))}
        </Carousel>
      </div>

      <div className="interactions">
        <div className="comments-count">
          {post.comments?.length ?? 0} comment
          {post.comments?.length != 1 && "s"}
          <BiCommentDetail
            style={{ marginLeft: 4, position: "relative", top: 2 }}
          />
        </div>
        <div className="votes">
          <div className="vote-number">
            {post.upvotes.length ?? 0}{" "}
            {post.upvotes
              .map((acc) => acc.toLowerCase())
              .includes(currentAccount) ? (
              <TbArrowBigUpFilled className="vote-icon" />
            ) : (
              <TbArrowBigUp
                onClick={() => {
                  upvotePost(post.id);
                  setPost({
                    ...post,
                    upvotes: [...post.upvotes, currentAccount],
                  });
                }}
                className="vote-icon"
              />
            )}
          </div>

          <div className="vote-number">
            {post.downvotes.length ?? 0}{" "}
            {post.downvotes
              .map((acc) => acc.toLowerCase())
              .includes(currentAccount) ? (
              <TbArrowBigDownFilled className="vote-icon" />
            ) : (
              <TbArrowBigDown
                onClick={() => {
                  downvotePost(post.id);
                  setPost({
                    ...post,
                    downvotes: [...post.downvotes, currentAccount],
                  });
                }}
                className="vote-icon"
              />
            )}
          </div>
        </div>
      </div>
      {post.comments &&
        post.comments.map((comment, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: "#F4F4F4", padding: 6, marginTop: 8 }}>
            <div className="comment-header">
              <img
                src={comment.author.profilePicture}
                className="comment-photo"
              />
              <p
                className="comment-username"
                style={{ color: comment.author.color }}>
                {comment.author.username}
              </p>
              <p className="comment-timestamp">
                {moment.unix(comment.timestamp).fromNow()}
              </p>
            </div>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))}
      <div className="comment-input-container">
        <input
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Type your comment ..."
          className="comment-input"
          value={commentInput}
        />
        <IoMdSend
          onClick={onCommentSent}
          style={{ margin: "auto 4px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Post;
