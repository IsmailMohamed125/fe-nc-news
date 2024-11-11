import CommentItem from "./CommentItem";

function CommentList({ comments, commentUsers }) {
  console.log(comments);
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {comments.map((comment, i) => (
        <CommentItem
          key={comment.comment_id}
          comment={comment}
          user={commentUsers[i][0]}
        />
      ))}
    </ul>
  );
}

export default CommentList;
