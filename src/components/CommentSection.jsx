import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function CommentSection({ comments, commentUsers, articleID }) {
  console.log(comments, commentUsers, "sec");
  return (
    <div className="p-3">
      <h2>Comments</h2>
      <CommentForm article={articleID} />
      <CommentList comments={comments} commentUsers={commentUsers} />
    </div>
  );
}

export default CommentSection;
