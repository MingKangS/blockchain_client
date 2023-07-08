import React, { useState, useContext } from "react";
import moment from "moment/moment";
import "../styles/components/Post.scss";
import draftToHtml from "draftjs-to-html";
import sanitizeHtml from "sanitize-html";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { shadeColor } from "../utils/functions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Post = ({ post }) => {
  const [commentInput, setCommentInput] = useState("");
  const onCommentSent = () => {
    post.comments.push({
      author: { username: "me", profilePhoto: "", color: "#3FCVAE" },
      text: commentInput,
      timestamp: Date.now(),
    });
    setCommentInput("");
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <img src={post.author.profilePicture} className="author-photo" />
        <p className="author" style={{ color: post.author.color }}>
          {post.author.username}
        </p>
        <p className="timestamp">{moment.unix(post.timestamp).fromNow()}</p>
      </div>
      <p
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
          {post.comments?.length ?? 0} comments
        </div>
        <div className="votes">
          <div className="vote-number">
            {post.upvotes ?? 0} <BiUpvote className="vote-icon" />
          </div>
          <div className="vote-number">
            {post.downvotes ?? 0} <BiDownvote className="vote-icon" />
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
                src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                className="comment-photo"
              />
              <p
                className="comment-username"
                style={{ color: comment.author.color }}>
                {comment.author.username}
              </p>
              <p className="comment-timestamp">
                {moment.unix(comment.timestamp / 1000).fromNow()}
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
