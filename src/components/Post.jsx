import moment from "moment/moment";
import "../styles/components/Post.scss";
import draftToHtml from "draftjs-to-html";
import sanitizeHtml from "sanitize-html";

const Post = ({ post }) => {
  return (
    <div className="post-container">
      <div className="post-header">
        <p className="author">{post.author}</p>
        <p className="timestamp">{moment.unix(post.timestamp).fromNow()}</p>
      </div>
      <p
        className="postContent"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(draftToHtml(JSON.parse(post.postContent))),
        }}></p>
    </div>
  );
};

export default Post;
