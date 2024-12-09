import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function CommentSection({ comments, commentUsers, articleID }) {
  return (
    <div className="p-3">
      <h2 className="text-2xl font-semibold">Comments</h2>
      <CommentForm article={articleID} />
      <CommentList comments={comments} commentUsers={commentUsers} />
    </div>
  );
}

export default CommentSection;
