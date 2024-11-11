import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Form, useNavigate } from "react-router-dom";
import { createComment } from "../api/comments";

function CommentForm({ article }) {
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCancel = () => {
    setIsFocused(false);
    setComment("");
  };
  if (!user) {
    // Redirect to login page if user is not authenticated
    navigate("/login");
    return null; // Don't render form if redirecting
  }

  return (
    <Form
      method="post"
      action={`/articles/${article}`}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="sm:col-span-4">
        <label
          htmlFor="comment"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Comment
        </label>
        <div className="mt-2">
          <div className="flex-col items-center p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
            <input
              id="comment"
              name="comment"
              type="text"
              placeholder="Add comment"
              autoComplete="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={handleFocus}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
            />
            <input type="hidden" name="username" value={user[0].username} />
            <input type="hidden" name="article" value={article} />

            {isFocused && (
              <div className="flex items-center justify-end space-x-2 ml-2 mt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                  Comment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
}

// actions.js
export async function commentFormAction({ request }) {
  const formData = await request.formData();
  const body = formData.get("comment");
  const username = formData.get("username");
  const article = formData.get("article");

  if (!username) {
    return { redirect: "/login" };
  }

  // Proceed with comment submission
  const newComment = { body, username };
  console.log("Comment submitted by:", username, "Comment:", body);

  // Here you can handle API submission or other logic
  const comment = await createComment(article, newComment);
  // Redirect or return response
  return { success: true };
}

export default CommentForm;
