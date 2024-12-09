import { useFetcher, useLoaderData } from "react-router-dom";
import { getArticle, getArticleComments } from "../api/articles";
import { getUser } from "../api/users";
import CommentSection from "../components/CommentSection";
import { HeartIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createComment, deleteComment, patchComment } from "../api/comments";
import { updateArticle } from "../api/articles";

function Article() {
  const { article, comments, user, commentUsers } = useLoaderData();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const data = useAuth();
  const fetcher = useFetcher();
  useEffect(() => {
    const storedLikeState = localStorage.getItem(
      `article-like-${article[0].article_id}`
    );
    if (storedLikeState === "true") {
      setLike(true);
    }
  }, [article.article_id_id]);
  const handleLikeClick = async () => {
    if (user) {
      const newLikeState = !like;
      const vote = newLikeState ? 1 : -1;
      const id = article[0].article_id;
      const username = user[0].username;

      setLike(newLikeState);
      setLikeCount((cur) => cur + vote);

      localStorage.setItem(`article-like-${id}`, newLikeState);
      fetcher.submit(
        { action: "likeArticle", article_id: id, vote, username },
        { method: "patch" }
      );
    }
  };
  return (
    <>
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            aria-hidden="true"
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <div className="flex -space-x-2 overflow-hidden items-center gap-5">
                  <img
                    alt=""
                    src={user[0].avatar_url}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  />
                  <span className="text-base/7 font-semibold text-indigo-600 ">
                    {user[0].username}
                  </span>
                  <div className="flex items-center gap-3">
                    <HeartIcon
                      onClick={handleLikeClick}
                      aria-hidden="true"
                      className={
                        like
                          ? "h-8 w-8 text-red-700 hover:cursor-pointer"
                          : "h-8 w-8 text-stone-400 hover:text-red-400 hover:outline-red-500 hover:cursor-pointer"
                      }
                    />
                    {article[0].votes}
                  </div>
                </div>

                <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {article[0].title}
                </h1>
                <p className="mt-6 text-xl/8 text-gray-700">
                  {article[0].body}
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              alt=""
              src={article[0].article_img_url}
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            />
          </div>
        </div>
      </div>
      <CommentSection
        articleID={article[0].article_id}
        comments={comments}
        commentUsers={commentUsers}
      />
    </>
  );
}

export async function loader({ params }) {
  const article = await getArticle(params.articleID);
  const comments = await getArticleComments(params.articleID);
  const user = await getUser(article[0].author);
  const commentUsers = await Promise.all(
    comments.map(async (comment) => {
      return await getUser(comment.author);
    })
  );
  return { article, comments, user, commentUsers };
}

export async function commentsAction({ request }) {
  const formData = await request.formData();
  const body = formData.get("comment");
  const username = formData.get("username");
  const article = formData.get("article");
  const action = formData.get("action");
  const commentID = formData.get("id");
  const articleID = formData.get("article_id");
  const vote = formData.get("vote");
  if (!username) {
    return { redirect: "/login" };
  }

  if (action === "likeComment") {
    const voteBody = { inc_votes: vote };
    // Update database or state as needed
    await patchComment(commentID, voteBody);

    return null; // No navigation or UI update
  }

  if (action === "likeArticle") {
    const voteBody = { inc_votes: vote };
    // Update database or state as needed
    await updateArticle(articleID, voteBody);

    return null; // No navigation or UI update
  }

  if (action === "deleteComment") {
    await deleteComment(commentID);

    return null; // No navigation or UI update
  }

  const newComment = { body, username };
  await createComment(article, newComment);

  // Redirect or return response
  return { success: true };
}

export default Article;
