import { HeartIcon } from "@heroicons/react/20/solid";
function CommentItem({ comment, user }) {
  const date = new Date(comment.created_at);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img
          alt=""
          src={user.avatar_url}
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
        />
        <div className="min-w-0 flex-auto ">
          <div className="flex items-center justify-between ">
            <p className="text-sm/6 font-semibold text-gray-900">
              {user.username}
            </p>
            <p className="flex items-center gap-2 text-sm/6 text-gray-900 sm:hidden">
              <HeartIcon
                aria-hidden="true"
                className=" h-5 w-5 text-stone-200 hover:text-red-400 hover:outline-red-500 "
              />
              {comment.votes}
            </p>
          </div>
          <p className="mt-1  text-xs/5 text-gray-500">{comment.body}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="flex items-center gap-2 text-sm/6 text-gray-900">
          <HeartIcon
            aria-hidden="true"
            className=" h-5 w-5 text-stone-200 hover:text-red-400 hover:outline-red-500 "
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
