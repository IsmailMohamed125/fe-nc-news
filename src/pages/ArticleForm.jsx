import { Form, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { createArticle } from "../api/articles";
import { useAuth } from "../contexts/AuthContext";

const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Coding");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFocus = () => setIsFocused(true);
  const handleCancel = () => {
    setTitle("");
    setTopic("Coding");
    setContent("");
    setFile(null);
    setIsFocused(false);
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      action={`/articles/new`}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 p-5"
    >
      <div className="sm:col-span-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-900"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Article title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleFocus}
            className="block w-full rounded-md border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-900"
        >
          Topic
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
          >
            <option>Coding</option>
            <option>Footie</option>
            <option>Cooking</option>
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-900"
        >
          Content
        </label>
        <div className="mt-2">
          <textarea
            id="content"
            name="content"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>
      <input type="hidden" name="author" value={user[0].username} />
      <div className="col-span-full">
        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-900"
        >
          Cover photo
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              aria-hidden="true"
              className="mx-auto size-12 text-gray-300"
            />
            <div className="mt-4 flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-600">PNG, JPG up to 10MB</p>
          </div>
        </div>
      </div>

      {isFocused && (
        <div className="col-span-full flex justify-end space-x-2">
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
            Submit
          </button>
        </div>
      )}
    </Form>
  );
};

export async function articleAction({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const author = formData.get("author");
  const topic = formData.get("topic").toLowerCase();
  const body = formData.get("content");
  const fileUpload = formData.get("file-upload");

  if (!author) {
    return redirect("/login");
  }

  const newArticle = { title, author, topic, body };
  const article = await createArticle(newArticle);

  if (article) {
    return redirect("/articles");
  }
}

export default AddArticleForm;
