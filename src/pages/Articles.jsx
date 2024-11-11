import { useLoaderData } from "react-router-dom";
import ArticleItems from "../components/ArticleItems";
import { getArticles } from "../api/articles";
import Pagination from "../components/Pagination";
import SortBy from "../components/SortBy";
import { getUser } from "../api/users";

function Articles() {
  const { articles, users } = useLoaderData();
  const articlesCount = articles[0].total_count;

  return (
    <div className="bg-white py-20 sm:py-16">
      <div className="mx-auto my-10 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Explore Our Latest Articles
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Dive into insights, trends, and expert advice across various topics.
          </p>
        </div>
        <div className="mt-2 flex font-medium text-gray-900 items-center gap-4 justify-end">
          <span>Sort By:</span>
          <SortBy />
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {articles.map((article, i) => (
            <ArticleItems
              article={article}
              key={article.article_id}
              user={users[i]}
            />
          ))}
        </div>
      </div>
      <Pagination articlesCount={articlesCount} />
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params, request }) {
  // console.log(params);
  const searchParams = new URL(request.url).searchParams;
  const searchSortByTerm = searchParams.get("sort_by");
  const searchOrderTerm = searchParams.get("order");
  const searchTopicTerm = searchParams.get("topic");
  const searchPageTerm = searchParams.get("p");

  let query = "";
  if (searchSortByTerm) query = query + "&sort_by=" + searchSortByTerm;

  if (searchOrderTerm) query = query + "&order=" + searchOrderTerm;

  if (searchTopicTerm) query = query + "&topic=" + searchTopicTerm;

  if (searchPageTerm) query = query + "&p=" + searchPageTerm;

  const articles = await getArticles(query);
  const users = await Promise.all(
    articles.map(async (article) => {
      return await getUser(article.author);
    })
  );

  return { articles, users };
}

export default Articles;
