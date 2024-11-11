import { useLoaderData } from "react-router-dom";
import { getTopics } from "../api/topics";

import TopicItems from "../components/TopicItems";

function Topics() {
  const topics = useLoaderData();

  return (
    <div className="m-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Topics Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Topic names and descriptions.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {topics.map((topic) => (
            <TopicItems topic={topic} key={topic.slug} />
          ))}
        </dl>
      </div>
    </div>
  );
}

export async function loader() {
  const topics = await getTopics();
  return topics;
}

export default Topics;
