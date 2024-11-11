import { useNavigate } from "react-router-dom";

function TopicItems({ topic }) {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt
        onClick={() => navigate(`/articles?topic=${topic.slug}`)}
        className="text-sm/6 font-medium text-gray-900  hover:text-gray-600 hover:cursor-pointer"
      >
        {topic.slug.toUpperCase()}
      </dt>
      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
        {topic.description}
      </dd>
    </div>
  );
}

export default TopicItems;
