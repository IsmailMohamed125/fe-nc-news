import { AtSymbolIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../contexts/AuthContext";
import { getUserArticles } from "../api/articles";
import { Link, useLoaderData } from "react-router-dom";
import ArticleItems from "../components/ArticleItems";

function Dashboard() {
  const { user } = useAuth();
  const userArticles = useLoaderData();

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className=" text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Profile
            </h2>
          </div>
        </div>
        <div className=" gap-x-8 gap-y-12  sm:gap-y-16 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-x-6">
            <img
              alt=""
              src={user[0].avatar_url}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                {user[0].name}
              </h3>
              <p className="flex items-center gap-1 text-sm/6 font-semibold text-indigo-600">
                <AtSymbolIcon
                  aria-hidden="true"
                  className=" h-5 w-5 text-stone-700 "
                />
                {user[0].username}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto  px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Your Articles
            </h2>
            <Link to="/articles/new">
              <PlusIcon aria-hidden="true" className="h-8 w-8 text-zinc-900" />
            </Link>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {userArticles.map((article) => (
              <ArticleItems
                article={article}
                key={article.article_id}
                user={user}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function loader() {
  const username = "tickle122";
  const articles = await getUserArticles();
  const userArticles = articles.filter((article) => {
    return article.author === username;
  });

  return userArticles;
}

export default Dashboard;
