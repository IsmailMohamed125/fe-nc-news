import { HeartIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function CommentItem({ comment, comment_user }) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const { user } = useAuth();
  const fetcher = useFetcher();
  useEffect(() => {
    const storedLikeState = localStorage.getItem(
      `comment-like-${comment.comment_id}`
    );
    if (storedLikeState === "true") {
      setLike(true);
    }
  }, [comment.comment_id]);

  const date = new Date(comment.created_at);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const handleLikeClick = async () => {
    if (user) {
      const newLikeState = !like;
      const vote = newLikeState ? 1 : -1;
      const id = comment.comment_id;
      const username = user[0].username;

      setLike(newLikeState);
      setLikeCount((cur) => cur + vote);

      localStorage.setItem(`comment-like-${id}`, newLikeState);
      fetcher.submit(
        { action: "likeComment", id, vote, username },
        { method: "patch" }
      );
    }
  };
  const handleDeleteClick = async () => {
    const id = comment.comment_id;
    const username = user[0].username;
    localStorage.removeItem(`comment-like-${id}`);
    fetcher.submit(
      { action: "deleteComment", id, username },
      { method: "delete" }
    );
  };
  return (
    <li className="flex justify-between gap-x-6 py-5 ">
      <div className="flex min-w-0 gap-x-4">
        <img
          alt=""
          src={comment_user.avatar_url}
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
        />
        <div className="min-w-0 flex-auto ">
          <div className="flex items-center justify-items-stretch gap-5 ">
            <p className="text-sm/6 font-semibold text-gray-900">
              {comment_user.username}
            </p>
            <p className="flex items-center gap-2 text-sm/6 text-gray-900 sm:hidden">
              {comment_user.username === user[0].username ? (
                <TrashIcon
                  onClick={handleDeleteClick}
                  aria-hidden="true"
                  className={
                    "h-5 w-5 text-stone-200 hover:text-red-400 hover:outline-red-500 hover:cursor-pointer"
                  }
                />
              ) : null}
              <HeartIcon
                onClick={handleLikeClick}
                aria-hidden="true"
                className={
                  like
                    ? "h-5 w-5 text-red-700 hover:cursor-pointer"
                    : "h-5 w-5 text-stone-200 hover:text-red-400 hover:outline-red-500 hover:cursor-pointer"
                }
              />
              {comment.votes}
            </p>
          </div>
          <p className="mt-1  text-xs/5 text-gray-500">{comment.body}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="flex items-center gap-2 text-sm/6 text-gray-900">
          {comment_user.username === user[0].username ? (
            <TrashIcon
              onClick={handleDeleteClick}
              aria-hidden="true"
              className={
                "h-5 w-5 text-stone-200 hover:text-red-400 hover:outline-red-500 hover:cursor-pointer"
              }
            />
          ) : null}
          <HeartIcon
            onClick={handleLikeClick}
            aria-hidden="true"
            className={
              like
                ? "h-5 w-5 text-red-700 hover:cursor-pointer"
                : "h-5 w-5 text-stone-200 hover:text-red-400 hover:outline-red-500 hover:cursor-pointer"
            }
          />
          {comment.votes}
        </p>

        <p className="mt-1 text-xs/5 text-gray-500">
          <time dateTime={comment.created_at}>{formattedDate}</time>
        </p>
      </div>
    </li>
  );
}

export default CommentItem;
