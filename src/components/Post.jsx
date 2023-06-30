import moment from "moment/moment";
import "../styles/components/Post.scss";
import draftToHtml from "draftjs-to-html";
import sanitizeHtml from "sanitize-html";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { shadeColor } from "../utils/functions";

const Post = ({ post }) => {
  const lightenColor = (color) => {
    return (
      "#" +
      color
        .replace(/^#/, "")
        .replace(/../g, (color) =>
          (
            "0" +
            Math.min(255, Math.max(0, parseInt(color, 16) + 180)).toString(16)
          ).substr(-2)
        )
    );
  };
  return (
    <div className="post-container">
      <div className="post-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
          className="author-photo"
        />
        <p className="author" style={{ color: post.author.color }}>
          {post.author.username}
        </p>
        <p className="timestamp">{moment.unix(post.timestamp).fromNow()}</p>
      </div>
      <p
        className="postContent"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(draftToHtml(JSON.parse(post.postContent))),
        }}
      ></p>
      <div className="interactions">
        <div className="comments-count">{post.comments.length} comments</div>
        <div className="votes">
          <div className="vote-number">
            {post.upvotes} <BiUpvote className="vote-icon" />
          </div>
          <div className="vote-number">
            {post.downvotes} <BiDownvote className="vote-icon" />
          </div>
        </div>
      </div>
      {post.comments.map((comment) => (
        <div style={{ backgroundColor: "#F4F4F4", padding: 6, marginTop: 8 }}>
          <div className="comment-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
              className="comment-photo"
            />
            <p
              className="comment-username"
              style={{ color: comment.author.color }}
            >
              {comment.author.username}
            </p>
            <p className="comment-timestamp">
              {moment.unix(comment.timestamp).fromNow()}
            </p>
          </div>
          <p className="comment-text">{comment.text}</p>
        </div>
      ))}
      <div>
        
      </div>
    </div>
  );
};

export default Post;
