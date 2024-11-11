import { useNavigate } from "react-router-dom";
function ArticleItems({ article, user }) {
  const navigate = useNavigate();
  const date = new Date(article.created_at);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log(formattedDate);
  console.log(user);
  return (
    <article
      key={article.article_id}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div className="flex items-center mb-2 gap-x-4 text-xs">
        <time dateTime="2020-03-16" className="text-gray-500">
          {formattedDate}
        </time>
        <span
          onClick={() => navigate(`/articles?topic=${article.topic}`)}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
        >
          {article.topic}
        </span>
      </div>
      <div className="group relative">
        <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2 ">
          <img
            className="w-full max-lg:max-w-xs"
            src={article.article_img_url}
            alt=""
          />
        </div>
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 hover:cursor-pointer">
          <span
            onClick={() => navigate(`/articles/${article.article_id}`)}
            className="absolute inset-0"
          />
          {article.title}
        </h3>
        {/* <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
          {article.description}
        </p> */}
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          alt=""
          src={user[0].avatar_url}
          className="h-10 w-10 rounded-full bg-gray-50"
        />
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900">
            <span className="absolute inset-0" />
            {user[0].name}
          </p>
          <p className="text-gray-600">{user[0].username}</p>
        </div>
      </div>
    </article>
  );
}

export default ArticleItems;
