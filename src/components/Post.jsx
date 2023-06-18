import moment from "moment/moment";
import "../styles/components/Post.scss";

const Post = ({ post }) => {
  return (
    <div className="post-container">
      <div className="post-header">
        <p className="author">{post.author}</p>
        <p className="timestamp">{moment.unix(post.timestamp).fromNow()}</p>
      </div>
      <p className="postContent">{post.postContent}</p>
    </div>
  );
};

export default Post;
