import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageButton from "./PageButton";
import { useSearchParams } from "react-router-dom";

export default function Pagination({ articlesCount }) {
  const pages = Math.ceil(articlesCount / 6);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  let querySearch = "";
  if (topicQuery) querySearch = querySearch + "&topic=" + topicQuery;
  if (orderQuery) querySearch = querySearch + "&order=" + orderQuery;
  if (sortByQuery) querySearch = querySearch + "&sortBy=" + sortByQuery;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={page < 2 ? true : false}
          onClick={() => {
            setPage((p) => p - 1);
            navigate(`/articles?p=${page - 1}${querySearch}`);
          }}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          disabled={page === pages ? true : false}
          onClick={() => {
            setPage((p) => p + 1);
            navigate(`/articles?p=${page + 1}${querySearch}`);
          }}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">6</span> of{" "}
            <span className="font-medium">{articlesCount}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              disabled={page < 2 ? true : false}
              onClick={() => {
                setPage((p) => p - 1);
                navigate(`/articles?p=${page - 1}${querySearch}`);
              }}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: pages }, (_, i) => i + 1).map((num) => (
              <PageButton
                key={num}
                btnValue={num}
                page={page}
                setPage={setPage}
                querySearch={querySearch}
              />
            ))}

            <button
              disabled={page === pages ? true : false}
              onClick={() => {
                setPage((p) => p + 1);
                navigate(`/articles?p=${page + 1}${querySearch}`);
              }}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
